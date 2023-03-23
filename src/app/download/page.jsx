"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import axios from "axios";
import { QrReader } from "react-qr-reader";
import { createGlobalStyle } from "styled-components";
import OtpInput from "react18-input-otp";
import Lottie from 'react-lottie-player'
import downloadingIcon from './../../../public/assets/downloading.json';
import qrCodeScanIcon from './../../../public/assets/qr-code-scanner.json';
import successIcon from './../../../public/assets/success.json';
import errorIcon from './../../../public/assets/error.json';

export default function Download() {
    const downloadURL = process.env.NEXT_PUBLIC_DOWNLOAD_URL;
    const [scanner, setScanner] = useState(false);
    const [downloadAnimation, setDownloadAnimation] = useState(false);
    const [successAnimation, setSuccessAnimation] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [error, setShowError] = useState(false);
    const [otp, setOtp] = useState("");

    let fileURL = null,
        fileName = null,
        code = null,
        fetchError = false;

    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };

    const handleRequest = async (code) => {
        console.log("code: " + code);
        setShowMain(false);
        await axios.get(downloadURL + "/" + code)
            .then((response) => {
                if (response === undefined || response.data === undefined || response.data.url === undefined || response.data.name === undefined) {
                    setShowError(true);
                    fetchError = true;
                    return;
                }
                fileURL = response.data.url;
                fileName = response.data.name;
            })
            .catch((error) => {
                console.log(error);
                setDownloadAnimation(false);
                setShowError(true);
                fetchError = true;
            })

        if (!fetchError) {
            setDownloadAnimation(true);
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                let blob = xhr.response;
                let file = new File([blob], fileName, { type: blob.type });

                let a = document.createElement("a");
                document.body.appendChild(a);
                a.download = file.name;
                a.href = URL.createObjectURL(file);
                a.click();
                setDownloadAnimation(false);
                setSuccessAnimation(true);
            };
            xhr.open('GET', fileURL);
            xhr.send();
        }
    }

    return (
        <>
            <Header />
            <GlobalStyle />
            {
                showMain &&
                <div className="main">
                    <div className="code-download">
                        <h1 className="titles">Enter the code</h1>
                        <OtpInput
                            className="element-spacing"
                            value={otp}
                            onChange={handleChange}
                            shouldAutoFocus={true}
                            isInputNum={true}
                            numInputs={6}
                            isSuccessed={true}
                            successStyle="success"
                            separator={<span className="otp-span">-</span>}
                        />
                        <div className="wrapper">
                            <button className="download-button" type="submit" onClick={() => { handleRequest(otp) }}>
                                <span className="button-span">Download</span>
                            </button>
                        </div>
                    </div>
                    <p className="titles">or</p>
                    <div className="qr-download" onClick={() => {
                        setShowMain(false);
                        setScanner(!scanner)
                    }}>
                        <Lottie
                            loop
                            animationData={qrCodeScanIcon}
                            play
                            style={{ width: 150, height: 150 }}
                        />
                        <p className="qr-title">Scan a QR Code</p>
                    </div>
                </div>
            }
            {
                scanner &&
                <div className="scanner">
                    <h2 className="titles">Scan the file QR Code</h2>
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                setScanner(false);
                                handleRequest(result?.text);
                                preventDefault();
                            }

                            if (!!error) {
                                setShowMain(false);
                                setDownloadAnimation(false);
                                // setShowError(true);
                                console.info(error);
                            }
                        }}
                    />
                </div>
            }
            {
                downloadAnimation &&
                <div>
                    <div className="lotties">
                        <h2 className="message">We are fetching your file. Please, wait!</h2>
                        <Lottie
                            className="download-lottie"
                            loop
                            animationData={downloadingIcon}
                            play
                        />
                    </div>
                </div>

            }
            {
                successAnimation &&
                <div>
                    <div className="lotties">
                        <h2 className="message">Request completed!</h2>
                        <Lottie
                            className="success-fail-lottie"
                            loop
                            animationData={successIcon}
                            play
                        />
                    </div>
                </div>
            }
            {
                error &&
                <div>
                    <div className="lotties">
                        <h2 className="message">Something went wrong. Please, recheck the input or try again later!</h2>
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

.code-download {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.element-spacing {
    // margin: 0 1rem 0 1rem;
}

.option-title {
    font-size: 2rem;
    color: white;
}

.otp-span {
    margin: 0 1rem 0 1rem;
    // font-size: 2rem;
    color: white;
}   

input {
    font-size: 2.5rem;
    background-color: white;
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

  .titles {
    text-align: center;
    font-size: 2rem;
    color: white;
    margin: 1rem 0 1rem 0;
  }

  .qr-download {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .qr-title {
    font-size: 2rem;
    color: white;
  }

  .message {
    text-align: center;
    margin-top: 25px;
    color: white;
  }

  .scanner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // height: 80vh;
    margin-top: 5%;
  }

  section {
    width: 300px;
  }

  .lotties {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}

  .download-lottie {
    margin-top: 25px;
    width: 250px;
  }

  .success-fail-lottie {
    margin-top: 25px;
    width: 300px;
  }

  @media only screen and (max-width: 768px) {

    .otp-span {
        margin: 0 0.25rem 0 0.25rem;
    }

    .element-spacing {
        margin: 0rem;
    }

    .lotties {
        margin-top: 15%;
    }

    .message {
        margin-top: 0px;
    }

    .download-lottie {
        width: 250px;
    }

    .success-fail-lottie {
        width: 250px;
      }

    section {
        width: 75%;
    }

  }
`;