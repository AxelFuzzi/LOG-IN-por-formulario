import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.info('[Mongoose(MongoBD)] - Conectada'))
  .catch((err) => console.info('[Mongoose(MongoBD)] - Error:', err.message));
