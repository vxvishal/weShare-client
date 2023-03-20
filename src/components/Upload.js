'use client';

import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";
import { FileUploader } from "react-drag-drop-files";

export default function Upload() {

    const uploadURL = process.env.NEXT_PUBLIC_UPLOAD_URL;

    const [file, setFile] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [numericCode, setNumericCode] = useState(null);

    const sendFile = async (e) => {
        // e.preventDefault();
        const data = new FormData();
        data.append('theFile', file);

        await axios.post(uploadURL, data)
            .then((response) => {
                console.log(response);
                console.log(response.data.numericCode);
                setQrCode(`${response.data.numericCode}`);
                setNumericCode(response.data.numericCode);
            })
            .catch(error => console.log(error));

        console.log("after axios");
    }

    const handleChange = (file) => {
        setFile(file);
    };

    return (
        <>
            <h1>Upload</h1>
            <form action={uploadURL} method="post" encType="multipart/form-data">
                <input type="file" onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                }} />
                <FileUploader
                    multiple={false}
                    handleChange={handleChange}
                    name="file"
                // types={fileTypes}
                />
            </form>
            <button onClick={sendFile}>Upload</button>
            {qrCode !== null &&
                <>
                    <QRCode value={qrCode} />
                    <h1>Numeric code: {numericCode} </h1>
                </>
            }
        </>
    )
}
