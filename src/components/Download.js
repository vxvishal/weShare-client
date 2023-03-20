"use client";

import { useState } from "react";
import axios from "axios";
import { QrReader } from "react-qr-reader";

export default function Download() {
    const downloadURL = process.env.NEXT_PUBLIC_DOWNLOAD_URL;
    const [scanner, setScanner] = useState(false);

    let fileURL = null,
        fileName = null,
        code = null;

    const setCode = (data) => {
        code = data;
        console.log(code);
    }

    const handleRequest = async () => {
        console.log(code);
        await axios.get(downloadURL + "/" + code)
            .then((response) => {
                fileURL = response.data.url;
                fileName = response.data.name;
            })

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
        };
        xhr.open('GET', fileURL);
        xhr.send();
    }

    return (
        <>
            <h1>Download</h1>
            <form>
                <input type="text" onChange={(e) => setCode(e.target.value)} />
            </form>
            <button type="submit" onClick={handleRequest}>Submit</button>
            <button type="submit" onClick={() => { setScanner(!scanner) }}>Scan</button>
            {scanner &&
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            console.log(result);
                            // setCode(result?.text);
                            setCode(result);
                            handleRequest();
                            preventDefault();
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    constraints={ facingMode: 'user' }
                />
            }
        </>
    )
}
