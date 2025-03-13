import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import './App.css';
import logo from './/assets/images/barcode-generator-logo.png';

function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGenerateQRCode = () => {
    if (url) {
      // Increase the QR code size by setting a larger width (e.g., 400)
      QRCode.toDataURL(url, { width: 400, margin: 2 }, (err, dataUrl) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return;
        }
        setQrCodeImage(dataUrl);
      });
    }
  };

  const handleDownload = () => {
    if (file && qrCodeImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Load the uploaded document image
      const documentImage = new Image();
      documentImage.src = URL.createObjectURL(file);
      documentImage.onload = () => {
        // Draw the document image on the canvas
        canvas.width = documentImage.width;
        canvas.height = documentImage.height + 300;
        ctx.drawImage(documentImage, 0, 0);

        // Draw the QR code at the bottom
        const qrCodeImageElement = new Image();
        qrCodeImageElement.src = qrCodeImage;
        qrCodeImageElement.onload = () => {
          ctx.drawImage(qrCodeImageElement, (canvas.width - 300) / 2, documentImage.height + 10, 300, 300);

          // Add "Scan to verify" text
          ctx.font = '20px Arial';
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.fillText('Scan to verify', canvas.width / 2, documentImage.height + 320);
        };

        // Save the canvas as an image
        canvas.toBlob((blob) => {
          saveAs(blob, 'document_with_qr.png');
        });
      };
    }
  };

  return (
    <div className="app">
      <img className='logo' src={logo} alt="Barcode Generator Logo" />
      <h1>QR-Code Generator</h1>
      <p>Upload file in jpeg, jpg or png format</p>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg" />
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      </div>
      {file && qrCodeImage && (
        <div className="document-preview">
          <img src={URL.createObjectURL(file)} alt="Uploaded Document" className="document-image" />
          <div className="qr-code-section">
            <img src={qrCodeImage} alt="QR Code" />
            <p>Scan to verify</p>
          </div>
          <button onClick={handleDownload}>Download Document with QR Code</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <footer>copyright 2025 Made with ♥ by Caleb Yinusa</footer>
    </div>
  );
}

export default App;