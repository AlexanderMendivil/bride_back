require('dotenv').config();
import express from 'express'
import cors from 'cors'
import { addGuests, deleteGuest, getGuests, updateGuest } from './services/guests.service'
import { IGuest } from './interfaces/guest.interface';
const app = express()
const port = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/guest', async (req, res) => {
  const guests = await getGuests()
  res.send(guests)
})
app.post('/guest', async (req, res) => {
  const result = await addGuests(req.body)
  res.send(result)
})
app.put('/guest', async (req, res) => {
  const  guest = req.body as IGuest
  const result = await updateGuest(guest)
  res.send(result)
})
app.delete('/guest', async (req, res) => {
  const ids = req.body
  const result = await deleteGuest(ids)
  res.send(result)
})

app.listen(port, async () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
