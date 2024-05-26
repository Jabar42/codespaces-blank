async function generateVideo() {
    const text = document.getElementById('text-input').value;
    if (!text) {
      alert('Please enter some text!');
      return;
    }
  
    // Enviar texto al servidor para generar el video
    const response = await fetch('/generate-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
  
    const result = await response.json();
    if (result.success) {
      const downloadContainer = document.getElementById('download-container');
      const downloadLink = document.getElementById('download-link');
      downloadLink.href = result.videoPath;
      downloadContainer.style.display = 'block';
    } else {
      alert('Error generating video.');
    }
  }
  