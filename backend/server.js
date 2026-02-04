import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import noteRoutes from './routes/note.routes.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'https://notes-app-orcin-zeta.vercel.app',
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});