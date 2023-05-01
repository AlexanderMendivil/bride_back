import { MongoClient, ServerApiVersion } from 'mongodb'

export const connectionAuth = async () => {
  try {
    const uri = process.env.MONGO_URL
    const client = new MongoClient(uri!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    await client.connect()
    const collection = client.db('Bride').collection('users')
    return collection
  } catch (e) {
    console.log(e)
  }
}
