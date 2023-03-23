'use client';

import axios from "axios";
import { useState } from "react";
import Header from "@/components/Header";
import QRCode from "react-qr-code";
import { FileUploader } from "react-drag-drop-files";
import { createGlobalStyle } from "styled-components";
import FileDrop from "@/components/FileDrop";
import Lottie from "react-lottie-player";
import fileUploadIcon from './../../../public/assets/file-upload.json';
import errorIcon from './../../../public/assets/error.json';

export default function Upload() {

    const uploadURL = process.env.NEXT_PUBLIC_UPLOAD_URL;
    const [file, setFile] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [numericCode, setNumericCode] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [showMain, setShowMain] = useState(true);
    const [uploadAnimation, setUploadAnimation] = useState(false);
    const [error, setShowError] = useState(false);

    const sendFile = async (e) => {
        const data = new FormData();
        data.append('theFile', file);

        await axios.post(uploadURL, data)
            .then((response) => {
                setUploadAnimation(false);
                setQrCode(`${response.data.numericCode}`);
                setNumericCode(response.data.numericCode);
            })
            .catch((error) => {
                console.log(error);
                setUploadAnimation(false);
                setShowError(true);
            });
    }

    const handleChange = (file) => {
        setFileName(file.name);
        setFile(file);
    };

    return (
        <>
            <Header />
            <GlobalStyle />
            {
                showMain &&
                <div className="main">
                    <h1 className="title">Choose a file</h1>
                    <FileUploader
                        className="file-uploader"
                        multiple={false}
                        handleChange={handleChange}
                        name="file"
                    >
                        <FileDrop fileName={fileName} />
                    </FileUploader>
                    <div className="wrapper">
                        <button className="download-button" type="submit" onClick={() => {
                            setShowMain(false);
                            setUploadAnimation(true);
                            sendFile();
                        }}>
                            <span className="button-span">Upload</span>
                        </button>
                    </div>
                </div>
            }
            {
                qrCode !== null &&
                <div className="qr-code">
                    <h2 className="message">Uploaded successfully!</h2>
                    <div className="qr-code-output">
                        <QRCode
                            value={qrCode}
                        />
                    </div>
                    <h1 className="numeric-code">Numeric code: {numericCode} </h1>
                </div>
            }
            {
                uploadAnimation &&
                <div>
                    <div className="lotties">
                        <h2 className="message">We are uploading your file. Please, wait!</h2>
                        <Lottie
                            className="success-fail-lottie"
                            loop
                            animationData={fileUploadIcon}
                            play
                        />
                    </div>
                </div>
            }
            {
                error &&
                <div>
                    <div className="lotties">
                        <h2 className="message">Something went wrong. Please, check your internet connection or try again later!</h2>
                        <Lottie
                            className="success-fail-lottie"
                            loop
                            animationData={errorIcon}
                            play
                        />
                    </div>
                </div>
            }
        </>
    )
}

const GlobalStyle = createGlobalStyle`

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.title {
    font-size: 2rem;
    color: white;
}

.file-uploader {
    width: 100px;
    height: 1000px;
}

.wrapper{
    position: relative;
    margin-top: 2rem;
    width: 100%;
    height: 100%;
  }

.download-button{
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: 1.5rem;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    border: 3px solid #8C82FC;
    background: #fff;
    color: #8C82FC;
    border-radius: 40px;
    cursor: pointer;
    overflow: hidden;
    transition: all .35s;
  }
  
  .download-button:hover{
    background: #8C82FC;
    color: #fff;
  }
  
  .button-span{
    color: black;
    font-size: 2rem;
    margin: 0 1rem 0 1rem;
    opacity: 1;
    visibility: visible;
    transition: all .35s;
  }


  .lotties {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}

.message {
    text-align: center;
    margin: 25px 0 25px 0;
    color: white;
  }

  .success-fail-lottie {
    margin-top: 25px;
    width: 300px;
  }

  .qr-code {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .qr-code-output {
    width: 300px;
    height: 300px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .numeric-code {
    text-align: center;
    margin-top: 25px;
  }

  @media only screen and (max-width: 768px) {

    .lotties {
        margin-top: 15%;
    }

    .message {
        margin-top: 25px;
    }

    .success-fail-lottie {
        width: 250px;
      }
}

`;