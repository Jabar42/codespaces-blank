const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-video', async (req, res) => {
  const text = req.body.text;

  // Aquí es donde se integrará ffmpeg.js para generar el video
  // Este código es un ejemplo y deberá ser completado con la lógica de ffmpeg.js

  res.json({ success: true, videoPath: '/path/to/generated/video.mp4' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
