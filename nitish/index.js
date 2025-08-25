import express from "express";
import dbConnect from "./config/dbConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

dbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})