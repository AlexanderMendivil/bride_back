import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectionAuth } from '../../DBConnection/connectionAuth';
import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
    const connect = await connectionAuth()?.connect()
  const collection = connect?.db('Bride').collection('users')

    const existingUser = await collection?.findOne({email: req.body.email})

    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

     bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try{

            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }
            
            const newUser = {
                email: req.body.email,
                password: hashedPassword,
            };
            const token = jwt.sign({ username: newUser.email }, process.env.SECRET_KEY!, { expiresIn: '30d' });
            
            const finalUser = {
                email: req.body.email,
                password: hashedPassword,
                jwt: `${token}`
            }
            
            await collection?.insertOne(finalUser)
            return res.status(201).json({ finalUser });
        }catch(e){
            return res.status(500).json({ message: 'Server error' });
        }
      });
      connect?.close()
}

export const login = async (req: Request, res: Response) =>{
    const connect = await connectionAuth()?.connect()
    const collection = connect?.db('Bride').collection('users')
    const existingUser = await collection?.findOne({email: req.body.email})

    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    bcrypt.compare(req.body.password, existingUser?.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      if (result) {
        const token = jwt.sign({ username: existingUser?.username, id: existingUser?.id }, process.env.SECRET_KEY!, { expiresIn: '30d' });

        return res.status(200).json({ token, user: req.body })
      }
      return res.status(401).json({ message: 'Authentication failed' });
    });

    connect?.close()
}