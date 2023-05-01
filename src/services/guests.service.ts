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
