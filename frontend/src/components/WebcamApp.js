import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import "../App.css";
import axios from 'axios';

function WebcamApp() {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const toggleCamera = () => {
    setIsCameraOn((prevState) => !prevState);
    setIsImageUpload(false);
  };

  const toggleImageUpload = () => {
    setIsImageUpload((prevState) => !prevState);
    setIsCameraOn(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsImageUpload(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('Uploaded image data:', uploadedImage);
  };

  axios({
    method: 'post',
    url: 'change later',
    data: {
      "filePath": uploadedImage
    }
  });

  const videoConstraints = {
    facingMode: isCameraOn ? 'user' : 'environment',
  };

  return (
    <div className="App" style={{ marginLeft: '30px', width: '35vw' }}>
      <div className="content-container">
        <div className="webcam-container">
          <div className="toggle-buttons">
            <button onClick={toggleCamera} className="toggle-button">
              {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
            </button>
            <button onClick={toggleImageUpload} className="toggle-button">
              {isImageUpload ? 'Hide Image Upload' : 'Upload Image'}
            </button>
          </div>
          {isCameraOn && !isImageUpload ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : isImageUpload ? (
            <div className="image upload">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="uploaded-image"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              )}
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
            </div>
          ) : (
            <div className="webcam-placeholder" style={{ width: '100%', height: '100%' }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default WebcamApp;
