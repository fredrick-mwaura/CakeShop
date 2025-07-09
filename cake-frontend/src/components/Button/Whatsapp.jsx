import React, {useState} from 'react'
import whatsapp from '../../images/whatsapp-svgrepo-com.svg'
// import QRCode from 'qrcode.react'

const Whatsapp = ()=> {
  const [showQRCode, setShowQRCode] = useState(false);
    const ChatUs = () => {
        window.open("https://wa.me/254701234567?text=Hi,%20I'm%20interested%20in%20your%20products", '_blank');
    }
    return (
        <>
            <div className='hover'>
                onMouseEnter={() => setShowQRCode(true)}
                onMouseLeave={() => setShowQRCode(false)}
                <image 
                    style={{ position: 'absolute', zIndex: showQRCode ? 0 : 1 }}
                    src={whatsapp} 
                    alt="whatsapp" 
                    className='whatsapp' 
                    onClick={ChatUs}
                />
                <div
                    style={{
                    position: 'absolute',
                    opacity: showQRCode ? 1 : 0,
                    transform: showQRCode ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    zIndex: 1,
                    }}
                >
                    {/* <QRCode value="https://wa.me/254701234567" size={150} /> */}
                </div>
            </div>
        </>
        
    )
}

export default Whatsapp;
