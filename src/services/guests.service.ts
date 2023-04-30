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

export const updateGuest = async (email: string, guest: IGuest) => {
  const collection = await connection()
  const update = { $set: guest }
  const updatedGuest = await collection?.updateOne({ email }, update)
  return updatedGuest
}

export const deleteGuest = async (email: string) => {
  const collection = await connection()
  const insertedGuest = await collection?.deleteOne({ email })
  return insertedGuest
}
