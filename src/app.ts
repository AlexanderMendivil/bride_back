import express from 'express'
import cors from 'cors'
import { addGuests, deleteGuest, getGuests, updateGuest } from './services/guests.service'
const app = express()
const port = 3000

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
  const { email, guest } = req.body
  const result = await updateGuest(email, guest)
  res.send(result)
})
app.delete('/guest', async (req, res) => {
  const { email } = req.body
  const result = await deleteGuest(email)
  res.send(result)
})

app.listen(port, async () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
