import { ChatCompletionCreateParamsNonStreaming } from 'openai/src/resources/chat/completions'
import OpenAIAPI from 'openai'
import { encode } from '@aliuq/gpt-3-encoder'
import PQueue from 'p-queue'

const EMBEDDING_MODEL = 'text-embedding-ada-002'
const GPTModels = {
  GPT3: 'text-davinci-003',
  GPT3_5: 'gpt-3.5-turbo',
  GPT4: 'gpt-4',
  GPT4_TURBO: 'gpt-4-1106-preview',
  GPT4_VISION: 'gpt-4-vision-preview'
} as const


export const wait = async (millis: number) => {
  await new Promise(resolve => setTimeout(resolve, millis))
}

export type GPTModel = (typeof GPTModels)[keyof typeof GPTModels]

// The queue ensures we're not hitting OpenAI rate limits
const queue = new PQueue({ concurrency: 10, intervalCap: 7, interval: 200 })

// This class is copied over from one of my (Faizan's) side projects
export class OpenAI {
  private readonly openai: OpenAIAPI

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('No OpenAI API key provided')

    this.openai = new OpenAIAPI({
      apiKey
    })
  }

  /**
   *
   * @throws {Error}
   */
  private handleError = (e: typeof OpenAIAPI.APIError | Error, msg: string) => {
    if (e instanceof OpenAIAPI.APIError) {
      let message = `${msg} ${e.message} | ${e.status}. `

      if (e.status === 400) {
        message += 'Bad request parameters, check payload.'
      } else if (e.status === 401) {
        message += 'Authentication error. Check API key.'
      } else if (e.status === 403) {
        message += 'Authorization error. Check subscription?'
      } else if (e.status === 404) {
        message += 'Not found error?'
      } else if (e.status === 422) {
        message += 'Unprocessable entity error. Check payload.'
      } else if (e.status === 429) {
        message += 'Rate limit exceeded.'
      } else if ((e.status || 500) >= 500) {
        message += 'Internal server error. Retry.'
      } else {
        message += 'Unknown OpenAI API connection error.'
      }

      const error = new Error(message)
      error.name = e.name
      error.stack = e.stack

      console.error('OpenAI APIError', { e: error })
      return error
    }

    console.error('Generic Error', { e: e as Error })
    return e
  }

  private handleRateLimits = async ({ headers }: Response) => {
    const percentage = (numerator: number, denominator: number): number => {
      return Math.ceil((numerator / denominator) * 100)
    }

    const totalRequestsPerMin = parseInt(headers.get('x-ratelimit-limit-requests'))
    const requestsRemaining = parseInt(headers.get('x-ratelimit-remaining-requests'))
    const totalTokensPerMin = parseInt(headers.get('x-ratelimit-limit-tokens'))
    const tokensRemaining = parseInt(headers.get('x-ratelimit-remaining-tokens'))
    // const requestResetTime = get('x-ratelimit-reset-requests')
    // const tokenResetTime = get('x-ratelimit-reset-tokens')

    if (percentage(tokensRemaining, totalTokensPerMin) < 10) {
      console.warn(`OpenAI: Token rate limit reached. Waiting 60 seconds`)
      await wait(60000)
    } else if (percentage(requestsRemaining, totalRequestsPerMin) < 10) {
      console.warn(`OpenAI: Request rate limit reached. Waiting 60 seconds`)
      await wait(60000)
    }
  }

  chatCompletion = async (systemMessage: string, prompt: string, model: GPTModel): Promise<string> => {
    const tokens = encode(prompt).length + encode(systemMessage).length
    console.info(`Creating chat completion for ${tokens} tokens`)

    if (model === 'gpt-4' && tokens > 8190) throw new Error('Prompt is too long')

    const func = async (): Promise<string> => {
      const { data: completion, response: raw } = await this.openai.chat.completions
        .create({
          temperature: 0,
          messages: [
            {
              role: 'system',
              content: systemMessage
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          model
        })
        .withResponse()

      await this.handleRateLimits(raw)
      return completion.choices[0].message.content
    }

    return queue.add<string>(async () => {
      try {
        return func()
      } catch (e) {
        // Model is overloaded?
        if ('status' in e && e.status >= 500) {
          console.info('Model is overloaded, waiting 500ms and retrying')
          return wait(500).then(() => func())
        }

        throw this.handleError(e, `Error creating completion for ${systemMessage.substring(0, 20)}...\``)
      }
    })
  }

  imageChatCompletion = async (base64: string, prompt: string): Promise<string> => {
    try {
      const opts: ChatCompletionCreateParamsNonStreaming = {
        model: GPTModels.GPT4_VISION,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: { url: `data:image/jpeg;base64,${base64}` }
              }
            ]
          }
        ]
      }

      const { choices } = await this.openai.chat.completions.create(opts)
      return choices[0].message.content
    } catch (e) {
      console.error('Error creating image chat completion', { e })
      throw e
    }
  }

  createEmbedding = async (input: string): Promise<Array<OpenAIAPI.Embeddings.Embedding>> => {
    const tokens = this.computeTokens(input)

    const { data } = await this.openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input
    })

    console.info(`Createdd embedding for ${tokens} tokens`)

    return data
  }
  computeTokens = (input: string): number => encode(input).length
}

export const openai = new OpenAI('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')

export const getSummary = (ticker: string, increase: boolean, article: string): Promise<string> => {
  return openai.chatCompletion(`You are a seasoned Wall Street analyst who is an expert in linking news cycle events to stock price swings.

Given the article below, explain why the stock ${ticker} has ${increase ? 'increased' : 'decreased'}.

Your response MUST be a single paragraph.  I will tip extra for simple, easy to understand language.`, article, 'gpt-4')
}