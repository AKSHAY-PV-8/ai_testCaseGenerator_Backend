import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { pool } from './config/db.js';
import uploadRouter from './modules/upload/upload.routes.js';
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST'],
}));


app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/upload", uploadRouter);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

connectDB();