import React, { useState } from 'react';
// import QRCode from 'qrcode.react'; 
function QRCodeOnHover() {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowQRCode(true)}
      onMouseLeave={() => setShowQRCode(false)}
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s',
      }}
    >
      <span style={{ position: 'absolute', zIndex: showQRCode ? 0 : 1 }}>
        Hover over me
      </span>
      <div
        style={{
          position: 'absolute',
          opacity: showQRCode ? 1 : 0,
          transform: showQRCode ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          zIndex: 1,
        }}
      >
        {/* <QRCode value="https://example.com" size={150} /> */}
      </div>
    </div>
  );
}

export default QRCodeOnHover;
