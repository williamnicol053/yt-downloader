app.get("/download", async (req, res) => {
  const { id, type } = req.query;

  if (!id) {
    return res.status(400).send("Missing video id");
  }

  const url = `https://www.youtube.com/watch?v=${id}`;

  try {
    const info = await ytdl.getInfo(url);

    if (type === "mp3") {
      res.header("Content-Disposition", 'attachment; filename="audio.mp3"');

      ytdl(url, {
        filter: "audioonly",
        highWaterMark: 1 << 25
      }).pipe(res);

    } else {
      res.header("Content-Disposition", 'attachment; filename="video.mp4"');

      ytdl(url, {
        quality: "highestvideo",
        highWaterMark: 1 << 25
      }).pipe(res);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to process video");
  }
});
