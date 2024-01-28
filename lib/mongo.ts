import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://faizanali619:<password>@l2fcluster.bqjajly.mongodb.net/?retryWrites=true&w=majority'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

await client.connect()

export const mongoDb = client.db('l2f')
export const mongo = mongoDb.collection('data')