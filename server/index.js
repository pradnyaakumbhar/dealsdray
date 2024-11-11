import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './src/routes/userRoutes.js';
import employeeRoute from './src/routes/employeeRoutes.js';
dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/employees', employeeRoute);
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
