import jsQR from 'jsqr';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
//create any qr code at https://goqr.me/ on your phone
//  and scan it with your laptop camera
const Qr = () => {
  const [scanning, setScanning] = useState(false);
  const [code, setCode] = useState();
  const video = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    if (!scanning) {
      return;
    }
    const videoElement =
      video.current as unknown as HTMLVideoElement;
    const canvasElement =
      canvas.current as unknown as HTMLCanvasElement;
    const canvasContext = canvasElement?.getContext('2d');
    let stream;
    function scan() {
      if (
        !(
          videoElement.readyState ===
          videoElement.HAVE_ENOUGH_DATA
        )
      ) {
        requestAnimationFrame(scan);
        return;
      }
      const height = videoElement.videoHeight;
      const width = videoElement.videoWidth;
      let code;
      canvasElement.height = height;
      canvasElement.width = width;
      canvasContext?.drawImage(
        videoElement,
        0,
        0,
        width,
        height
      );
      const imageData = canvasContext?.getImageData(
        0,
        0,
        width,
        height
      );
      if (imageData) {
        code = jsQR(imageData.data, width, height);
      }
      if (!code) {
        requestAnimationFrame(scan);
        return;
      }
      setCode(code.data);
      setScanning(false);
    }
    async function init() {
      //@todo: getUsermedia does not work on Ios browser (will work as app)
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      videoElement.srcObject = stream;
      videoElement.setAttribute('playsInline', 'true');
      videoElement.play();
      requestAnimationFrame(scan);
    }
    init();
    return () => {
      //cleanup gets previous value
      if (scanning) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
    };
  }, [scanning]);
  return (
    <>
      {scanning && (
        <>
          <video
            ref={video}
            style={{ width: '100%' }}
          ></video>
          <button onClick={() => setScanning(false)}>
            stop scanning
          </button>
          <canvas
            ref={canvas}
            style={{ visibility: 'hidden' }}
          ></canvas>
        </>
      )}
      {!scanning && (
        <>
          <h1>your checkout page here</h1>
          <p>code:{code}</p>
          <button onClick={() => setScanning(true)}>
            scan
          </button>
        </>
      )}
    </>
  );
};
export default Qr;
