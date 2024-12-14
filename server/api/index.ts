import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.route'
import courseRoutes from './routes/courses.route'
import adminRoutes from './routes/admin.route'
import authRoutes from './routes/auth.route'

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://course-management-weld-beta.vercel.app',
    credentials: true
}))

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);

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