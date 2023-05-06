import { connection } from '../../DBConnection/connection'
import { type IGuest } from '../interfaces/guest.interface'

export const getGuests = async () => {
  const collection = await connection()
  return await collection?.find({}).toArray()
}

export const addGuests = async (guest: IGuest) => {
  const collection = await connection()
  const insertedGuest = await collection?.insertOne(guest)
  return insertedGuest
}

export const updateGuest = async ( guest: IGuest) => {
  const collection = await connection()
  const update = { $set: guest }
  const updatedGuest = await collection?.updateOne({ id:guest.id }, update)
  return updatedGuest
}

export const deleteGuest = async ( ids: string[] ) => {
  const collection = await connection()
  const insertedGuest = await collection?.deleteMany({id: {$in: ids}})
  return insertedGuest
}


export const confirmInvite = async ( id: string, status: string ) => {
  const collection = await connection()
  const guest = await collection?.findOne({ id: id })

  if(guest){
    const update = { $set: {...guest, status} }
    const updatedGuest = await collection?.updateOne({ id:guest.id }, update)
    return updatedGuest
  }    
}
// This is the function I´m creating to sent Whatsapp messages
export const sendMessages = async ( ids: string[] ) => {
  const collection = await connection()
  // return await collection?.find({}).toArray()
  const guests = await collection?.find({ _id: { in: ids } }).toArray()
  console.log(guests)
  // Get the phone number for every user, then save them in an array
  // Iterate that array to send a message for each phone number
}