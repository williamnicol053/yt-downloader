const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("YouTube Downloader API is running");
});

app.get("/download", async (req, res) => {
  const { id, type } = req.query;

  if (!id) {
    return res.status(400).send("Missing video id");
  }

  const url = `https://www.youtube.com/watch?v=${id}`;

  try {
    if (type === "mp3") {
      res.header("Content-Disposition", 'attachment; filename="audio.mp3"');
      ytdl(url, { filter: "audioonly" }).pipe(res);
    } else {
      res.header("Content-Disposition", 'attachment; filename="video.mp4"');
      ytdl(url, { quality: "highestvideo" }).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Download failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
