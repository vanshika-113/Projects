const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection
mongoose.connect("MONGO_URI_HIDDEN");
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 📦 Schema

const artworkSchema = new mongoose.Schema({
    title: String,
  artist: {
    name: String,
    id: String
  },
  image: String,
  category: String,
  tags: [String],   // ✅ array
  likes: Number,
  saves: Number,
  views: Number,
  comments: [
    {
      user: String,
      text: String,
      date: Date
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
artworkSchema.index({ category: 1 });
artworkSchema.index({ "artist.name": 1 });
artworkSchema.index({ tags: 1 });

const Artwork = mongoose.model("Artwork", artworkSchema);

// 📥 GET all artworks
app.get("/api/artworks", async (req, res) => {
  const data = await Artwork.find();
  res.json(data);
});

// 📤 ADD artwork
app.post("/api/artworks", async (req, res) => {
  const newArtwork = new Artwork(req.body);
  await newArtwork.save();
  res.json({ message: "Saved to DB" });
});

app.get("/api/artworks/filter", async (req, res) => {
  const data = await Artwork.find(
    { category: req.query.category },   // filter
    { title: 1, artist: 1 }             // projection
  );
  res.json(data);
});

app.get("/api/artworks/search", async (req, res) => {
  const data = await Artwork.find({
    title: { $regex: req.query.q, $options: "i" }
  });
  res.json(data);
});

app.put("/api/artworks/:id/like", async (req, res) => {
  await Artwork.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } }
  );
  res.json({ message: "Liked" });
});

app.post("/api/artworks/:id/comment", async (req, res) => {
  await Artwork.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          user: "User",
          text: req.body.text,
          date: new Date()
        }
      }
    }
  );
  res.json({ message: "Comment added" });
});

app.get("/api/artworks/stats", async (req, res) => {
  const stats = await Artwork.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: 1 },
        avgLikes: { $avg: "$likes" }
      }
    }
  ]);
  res.json(stats);
});

app.get("/api/artworks/artist/:name",
async (req, res) => {

    const data = await Artwork.find({
        "artist.name": {
            $regex: req.params.name,
            $options: "i"
        }
    });

    res.json(data);
});

app.get("/api/artworks/artist-search", async (req, res) => {
  const data = await Artwork.find({
    "artist.name": { $regex: req.query.name, $options: "i" }
  });
  res.json(data);
});

app.get("/api/artworks/tag/:tag", async (req, res) => {
  const data = await Artwork.find({
    tags: req.params.tag
  });

  res.json(data);
});

app.get("/api/artworks/tag/:tag", async (req, res) => {
  try {
    const data = await Artwork.find({
      tags: req.params.tag
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/stats/categories", async (req, res) => {
  const stats = await Artwork.aggregate([
    {
      $group: {
        _id: "$category",
        totalArtworks: { $sum: 1 },
        totalLikes: { $sum: "$likes" },
        averageViews: { $avg: "$views" }
      }
    }
  ]);

  res.json(stats);
});

app.get("/api/stats/tags", async (req, res) => {
  const stats = await Artwork.aggregate([
    { $unwind: "$tags" },
    {
      $group: {
        _id: "$tags",
        total: { $sum: 1 }
      }
    },
    { $sort: { total: -1 } }
  ]);

  res.json(stats);
});

/*app.get("/api/artworks/artist/:name", async (req, res) => {
  const data = await Artwork.find({
    "artist.name": req.params.name
  });

  res.json(data);
});*/

app.get("/api/search", async (req, res) => {
  const query = req.query.q;

  const data = await Artwork.find({
    title: { $regex: query, $options: "i" }
  });

  res.json(data);
});

app.get("/api/artists", async (req, res) => {

    const artists = await Artwork.aggregate([
        {
            $group: {
                _id: "$artist.name",
                artistId: { $first: "$artist.id" },
                totalArtworks: { $sum: 1 }
            }
        }
    ]);

    res.json(artists);
});

app.listen(5000, () => console.log("Server running on port 5000"));
