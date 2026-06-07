// server.ts
import express from "express";
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'https://authhub-git-main-medinanzzs-projects.vercel.app/',
}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});

app.use(express.json());

export { app };