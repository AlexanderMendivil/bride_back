require('dotenv').config();
import express from 'express'
import cors from 'cors'
import { addGuests, confirmInvite, deleteGuest, getGuests, updateGuest, sendEmails } from './services/guests.service'
import { IGuest } from './interfaces/guest.interface';
import { login, signUp } from './services/auth.service';
import { authenticateToken } from './middleware/auth.middleware';
const app = express()
const port = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', login);

app.post('/signup', signUp);

app.get('/guest', authenticateToken, async (req, res) => {
  const guests = await getGuests()
  res.send(guests)
})
app.post('/guest', authenticateToken, async (req, res) => {
  const result = await addGuests(req.body)
  res.send(result)
})
app.put('/guest', authenticateToken, async (req, res) => {
  const  guest = req.body as IGuest
  const result = await updateGuest(guest)
  res.send(result)
})
app.delete('/guest', authenticateToken, async (req, res) => {
  const ids = req.body
  const result = await deleteGuest(ids)
  res.send(result)
})

app.put('/invite', authenticateToken, async (req, res) => {
  const  { id, status } = req.body
  const result = await confirmInvite(id, status)
  res.send(result)
})

app.post('/invite', authenticateToken, async (req, res) => {
  const { ids } = req.body
  const result = await sendEmails(ids)
  res.send(result)
})

app.listen(port, async () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
