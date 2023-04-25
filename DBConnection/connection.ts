import { MongoClient, ServerApiVersion  } from 'mongodb';

export const connection = async () => {
    try{
        const uri = "mongodb+srv://alexander:S8Wfvi38b7fZY2K@bride.8v2q0kp.mongodb.net/?retryWrites=true&w=majority";  
        const client = new MongoClient(uri,{
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
        await client.connect();
        return client.db("Bride");
    }catch(e){
        console.log(e)
    }
} 


