import express from "express";
import path from "path";
import fs from "fs/promises";

const app = express();
const PORT = process.env.PORT || 5002;

// new: return list of images from client/public/gallery
app.get("/api/gallery", async (req, res) => {
  try {
    const galleryDir = path.join(__dirname, "../../client/public/gallery");
    const files = await fs.readdir(galleryDir);
    const images = files
      .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
      .map((f) => `/gallery/${f}`);
    res.json({ images });
  } catch (err) {
    console.error("Failed to read gallery folder:", err);
    res.status(500).json({ error: "Unable to read gallery" });
  }
});

// new: return list of images from client/public/logos
app.get("/api/logos", async (req, res) => {
  try {
    const dir = path.join(__dirname, "../../client/public/logos");
    const files = await fs.readdir(dir);
    const images = files
      .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
      .map((f) => `/logos/${f}`);
    res.json({ images });
  } catch (err) {
    console.error("Failed to read logos folder:", err);
    res.status(500).json({ error: "Unable to read logos" });
  }
});

// new: return list of images from client/public/illustrations
app.get("/api/illustrations", async (req, res) => {
  try {
    const dir = path.join(__dirname, "../../client/public/illustrations");
    const files = await fs.readdir(dir);
    const images = files
      .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
      .map((f) => `/illustrations/${f}`);
    res.json({ images });
  } catch (err) {
    console.error("Failed to read illustrations folder:", err);
    res.status(500).json({ error: "Unable to read illustrations" });
  }
});

// new: return list of images from client/public/products
app.get("/api/products", async (req, res) => {
  try {
    const dir = path.join(__dirname, "../../client/public/products");
    const files = await fs.readdir(dir);
    const images = files
      .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
      .map((f) => `/products/${f}`);
    res.json({ images });
  } catch (err) {
    console.error("Failed to read products folder:", err);
    res.status(500).json({ error: "Unable to read products" });
  }
});

app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
