import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/pages/qrscanner.css";

export default function QRScanner() {
  const { t } = useTranslation();

  const videoRef = useRef(null);
  const [scannerSupported, setScannerSupported] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let stream = null;

  // Detect Browser Support
  useEffect(() => {
    if (!("BarcodeDetector" in window)) {
      setScannerSupported(false);
    }
  }, []);

  const startCamera = async () => {
    try {
      setErrorMsg("");
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });

      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraActive(true);

      scanLoop(detector);
    } catch (err) {
      setErrorMsg(t("camera_permission_denied"));
    }
  };

  const stopCamera = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  const scanLoop = async (detector) => {
    if (!cameraActive) return;

    try {
      const barcodes = await detector.detect(videoRef.current);

      if (barcodes.length > 0) {
        setQrValue(barcodes[0].rawValue);

        // Save scanned code
        localStorage.setItem("qr_last_scan", barcodes[0].rawValue);

        stopCamera();
        return;
      }
    } catch (err) {
      console.error(err);
    }

    requestAnimationFrame(() => scanLoop(detector));
  };

  return (
    <div className="qr-container">

      <h2 className="qr-title">{t("qr_scanner")}</h2>

      {!scannerSupported && (
        <p className="qr-error">{t("browser_not_supported")}</p>
      )}

      {scannerSupported && (
        <>

          <video ref={videoRef} className="qr-video"></video>

          <div className="qr-buttons">
            {!cameraActive && (
              <button className="btn start-btn" onClick={startCamera}>
                {t("start_scanner")}
              </button>
            )}

            {cameraActive && (
              <button className="btn stop-btn" onClick={stopCamera}>
                {t("stop_scanner")}
              </button>
            )}
          </div>

          {qrValue && (
            <div className="qr-result">
              <p>{t("qr_detected")}: <strong>{qrValue}</strong></p>
            </div>
          )}

          {errorMsg && <p className="qr-error">{errorMsg}</p>}
        </>
      )}
    </div>
  );
}
