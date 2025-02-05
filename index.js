import express from "express";
import cors from "cors";

import Event from "./events.model.js";

import "dotenv/config";
import mongoose from "mongoose";

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log("API running on port", PORT));

app.get("/", async (req, res) => {
  try {
    res.status(200).json("Welcome to events api");
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/events", async (req, res) => {


  try {
    const event = await Event.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: `${id} not found` });
    }
    res.status(200).json({ message: `product with ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// const client = new MongoClient(URI)
// const database = client.db('game-store')
// const games = database.collection('games')
// client.connect()
// console.log('mongodb connected');
