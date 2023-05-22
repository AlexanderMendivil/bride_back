import { connection } from '../../DBConnection/connection'
import { type IGuest } from '../interfaces/guest.interface'
import nodemailer from 'nodemailer'

export const getGuests = async () => {
  const connect = await connection()?.connect()
  const collection = connect?.db('Bride').collection('guests')
  const guests = await collection?.find({}).toArray()
  connect?.close()
  return guests
}

export const getOneGuest = async ( id: string ) => {
  const connect = await connection()?.connect()
  const collection = connect?.db('Bride').collection('guests')
  const guest = await collection?.findOne({ id })
  connect?.close()
  return guest
}
export const addGuests = async (guest: IGuest) => {
  const connect = await connection()?.connect()
  const collection = connect?.db('Bride').collection('guests')
  const insertedGuest = await collection?.insertOne(guest)
  connect?.close()
  return insertedGuest
}

export const updateGuest = async ( guest: IGuest) => {
  const connect = await connection()?.connect()
  const collection = connect?.db('Bride').collection('guests')
  const update = { $set: guest }
  const updatedGuest = await collection?.updateOne({ id:guest.id }, update)
  connect?.close()
  return updatedGuest
}

export const deleteGuest = async ( ids: string[] ) => {
  const connect = await connection()?.connect()
  const collection = connect?.db('Bride').collection('guests')
  const insertedGuest = await collection?.deleteMany({id: {$in: ids}})
  connect?.close()
  return insertedGuest
}


export const confirmInvite = async ( id: string, status: string ) => {
  const connect = await connection()?.connect()
  const collection = connect?.db('Bride').collection('guests')
  const guest = await collection?.findOne({ id: id })

  if(guest){
    const update = { $set: {...guest, status} }
    const updatedGuest = await collection?.updateOne({ id:guest.id }, update)
    connect?.close()
    return updatedGuest
  }    
}

export const sendEmails = async ( ids: string[] ) => {
  const connect = await connection()?.connect()
  const collection = connect?.db('Bride').collection('guests')

  var transporter = nodemailer.createTransport({
    service: `${process.env.EMAIL_SERVICE}`,
    auth: {
      user: `${process.env.EMAIL_INVITE}`,
      pass: `${process.env.EMAIL_PASSWORD}`
    }
  });
  const guests = await collection?.find({ id: { $in: ids }}).toArray()
  
  if(guests){
    for(let guest of guests){
      let mailOptions = {
        from: `${process.env.EMAIL_INVITE}`,
        to: `${guest.email}`,
        subject: 'Has recibido una invitación para la boda de Andrea y José Inés!',
        text: `Hola! el motivo de este correo es la invitación a la boda, en el siguiente link podras ver la invitación: ${process.env.PROD_LINK}/slideshow/${guest.id} no olvides  confirmar tu assitencia al final :)`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    }
  }
  connect?.close()
}