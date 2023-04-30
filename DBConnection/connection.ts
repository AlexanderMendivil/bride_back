import { MongoClient, ServerApiVersion } from 'mongodb'

export const connection = async () => {
  try {
    const uri = 'mongodb+srv://alexander:S8Wfvi38b7fZY2K@bride.8v2q0kp.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    await client.connect()
    const collection = client.db('Bride').collection('guests')
    return collection
  } catch (e) {
    console.log(e)
  }
}
