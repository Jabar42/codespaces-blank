import express from 'express';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-video', async (req, res) => {
  const text = req.body.text;
  const ffmpeg = createFFmpeg({ log: true });

  await ffmpeg.load();

  // Crear un archivo de texto temporal con el contenido
  const tempTextFile = path.join(__dirname, 'temp.txt');
  fs.writeFileSync(tempTextFile, text);

  // Leer el archivo y usar ffmpeg.js para crear el video
  ffmpeg.FS('writeFile', 'input.txt', await fetchFile(tempTextFile));

  await ffmpeg.run('-f', 'lavfi', '-i', 'color=c=black:s=320x240:d=5', '-vf', `drawtext=fontfile=/path/to/font.ttf:textfile=input.txt:fontsize=20:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:box=1:boxcolor=black@0.5:boxborderw=5`, 'output.mp4');

  const data = ffmpeg.FS('readFile', 'output.mp4');

  const videoPath = path.join(__dirname, 'public', 'videos', 'output.mp4');
  fs.writeFileSync(videoPath, Buffer.from(data.buffer));

  // Eliminar el archivo de texto temporal
  fs.unlinkSync(tempTextFile);

  res.json({ success: true, videoPath: '/videos/output.mp4' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
