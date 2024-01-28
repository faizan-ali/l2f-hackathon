import * as playwright from '@playwright/test'
import * as cheerio from 'cheerio'
import { CheerioAPI } from 'cheerio'

const browser = await playwright.chromium.launch({ headless: true })
export const scrape = async (url: string, useHeadless = true): Promise<string> => {
  console.info(`Scraping ${url} using ${useHeadless ? 'Playwright' : 'Fetch'}`)

  if (!useHeadless) {
    try {
      const response = await fetch(url, { redirect: 'follow' })
      return response.text()
    } catch (e) {
      console.error(`Error scraping ${url} through Fetch: ${e.message}`, { e })
      throw e
    }
  }

  const context = await browser.newContext()

  if (!browser || !context) {
    console.error('Playwright browser not initialized')
    throw new Error('Playwright not initialized')
  }

  const page = await context.newPage()

  try {
    await page.goto(url)
    const html = await page.content()
    const $ = cheerio.load(html)
    removeExtraHtml($)
    return $.text().replaceAll('  ', '').replaceAll('\n\n\n\n', '\n').replaceAll('\n\n', '\n').trim()
  } catch (e) {
    console.error(`Error scraping ${url} through Playwright: ${e.message}`, { e })
    throw e
  } finally {
    await page.close()
    await context.close()
  }
}

export const removeExtraHtml = ($: CheerioAPI): void => {
  $('footer').remove()
  $('header').remove()
  $('#header').remove()
  $('#footer').remove()
  $('.navbar').remove()
  $('#navbar').remove()
  $('nav').remove()
  $('.fnavbar').remove()
  $('.ffooter').remove()
  // MindsDB
  $('.navigation-wrap-2').remove()
  $('.header-display-desktop').remove()
  $('.header-display-mobile').remove()
  // VCPlatform
  $('.page-footer').remove()
  // VCPlatform
  $('.navbar-2').remove()
  // VCPlatform
  $('.w-nav').remove()
  $('script').remove()
  $('style').remove()
  $('noscript').remove()
  $('iframe').remove()
  $('link').remove()
  $('img').remove()
  $('input').remove()
$('button').remove()

  $('body').contents().filter(function() {
    return this.type === 'comment'
  }).remove()
}
