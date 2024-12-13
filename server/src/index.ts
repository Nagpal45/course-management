import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

const mongoUri = process.env.MONGO_URI;
if(!mongoUri){
    throw new Error('Mongo URI not found');
}
mongoose.connect(mongoUri).then(()=>{
    console.log("Database connected");
})


app.listen(5000, () => {
    console.log("Server started on port 5000");
})