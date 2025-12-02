const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();
colors.enable();

const Anim = require("./database/anim.model");
const connect = require("./database/connect");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello World!".rainbow);
  res.send("Hello World!");
});

// GET ALL ANIME
app.get("/api/anime", async (req, res) => {
  const anime = await Anim.find();
  res.json(anime);
});

// GET SINGLE ANIME (Required for loading data into the Edit form)
app.get("/api/anime/:id", async (req, res) => {
  try {
    const anime = await Anim.findById(req.params.id);
    res.json(anime);
  } catch (error) {
    res.status(404).json({ message: "Anime not found" });
  }
});

// CREATE ANIME
app.post("/api/anime", async (req, res) => {
  const anime = new Anim(req.body);
  await anime.save();
  res.json(anime);
});

// UPDATE ANIME
app.put("/api/anime/:id", async (req, res) => {
  try {
    const updatedAnime = await Anim.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // This option returns the modified document rather than the original
    );
    res.json(updatedAnime);
  } catch (error) {
    res.status(400).json({ message: "Error updating anime" });
  }
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
  connect();
});