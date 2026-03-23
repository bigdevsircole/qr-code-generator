import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import './App.css';
import logo from './/assets/images/barcode-generator-logo.png';

function App() {
  const [mode, setMode] = useState('both');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const canvasRef = useRef(null);

  const handleCreateNew = () => {
    setFile(null);
    setUrl('');
    setQrCodeImage('');
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    handleCreateNew();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGenerateQRCode = () => {
    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }
    
    QRCode.toDataURL(url, { width: 400, margin: 2 }, (err, dataUrl) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return;
      }
      setQrCodeImage(dataUrl);
    });
  };

  const handleDownload = () => {
    if (mode === 'qr_only' && qrCodeImage) {
      const blob = dataURLtoBlob(qrCodeImage);
      saveAs(blob, 'qr_code.png');
      return;
    }

    if (file && qrCodeImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Load the uploaded document image
      const documentImage = new Image();
      documentImage.src = URL.createObjectURL(file);
      documentImage.onload = () => {
        // Calculate dynamic QR Code size based on document width (e.g. 25% of width, minimum 100px)
        const qrSize = Math.max(100, documentImage.width * 0.25);
        
        // Set canvas dimensions
        canvas.width = documentImage.width;
        canvas.height = documentImage.height + qrSize + 50;

        // Fill the canvas with a white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the document image on the canvas
        ctx.drawImage(documentImage, 0, 0);

        // Load the QR code image
        const qrCodeImageElement = new Image();
        qrCodeImageElement.src = qrCodeImage;
        qrCodeImageElement.onload = () => {
          // Draw the QR code at the bottom center
          ctx.drawImage(qrCodeImageElement, (canvas.width - qrSize) / 2, documentImage.height + 10, qrSize, qrSize);

          // Add "Scan to verify" text
          const fontSize = Math.max(16, qrSize * 0.08); // scale font size dynamically
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.fillText('Scan to verify', canvas.width / 2, documentImage.height + qrSize + 40);

          // Convert the canvas to a JPEG image and trigger download
          const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
          const blob = dataURLtoBlob(dataUrl);
          
          // Generate a dynamic filename based on the uploaded file
          const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          saveAs(blob, `${originalName}_with_qr.jpg`);
        };
      };
    }
  };

  // Helper function to convert data URL to Blob
  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="app">
      <img className='logo' src={logo} alt="Barcode Generator Logo" />
      <h1>QR-Code Generator</h1>
      <div className="mode-toggle">
        <button className={mode === 'both' ? 'active' : ''} onClick={() => handleModeChange('both')}>Image with QR Code</button>
        <button className={mode === 'qr_only' ? 'active' : ''} onClick={() => handleModeChange('qr_only')}>QR Code Only</button>
      </div>

      {mode === 'both' && <p>Upload file in jpeg, jpg or png format</p>}
      
      <div className="upload-section">
        {mode === 'both' && (
          <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" />
        )}
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      </div>
      
      {qrCodeImage && (mode === 'qr_only' || file) && (
        <div className="document-preview">
          {mode === 'both' && file && (
            <img src={URL.createObjectURL(file)} alt="Uploaded Document" className="document-image" />
          )}
          
          <div className="qr-code-section">
            <img src={qrCodeImage} alt="QR Code" />
            {mode === 'both' && <p>Scan to verify</p>}
          </div>

          <div className="action-buttons">
            <button className="download-btn" onClick={handleDownload}>
              {mode === 'both' ? 'Download image with QR Code' : 'Download QR Code'}
            </button>
            <button className="create-new-btn" onClick={handleCreateNew}>Create New</button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <footer>copyright {new Date().getFullYear()} Made with ♥ by Caleb Yinusa</footer>
    </div>
  );
}

export default App;