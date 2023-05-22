import { MongoClient, ServerApiVersion } from 'mongodb'

export const connection = () => {
  let client: MongoClient
  try {
    const uri = process.env.MONGO_URL
    client = new MongoClient(uri!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    return client
    // await client.connect()
    // const collection = client.db('Bride').collection('guests')
    // return collection
  } catch (e) {
    console.log(e)
  }
}
