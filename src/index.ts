import express from 'express';
import cors from "cors";
import { connection } from '../DBConnection/connection';
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, async () => {
    console.log("here")
    await connection()
  return console.log(`Express is listening at http://localhost:${port}`);
});

