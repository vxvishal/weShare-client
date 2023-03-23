import { useState } from "react";
import { createGlobalStyle } from "styled-components"

export default function FileDrop(props) {

    const [showFileName, setShowFileName] = useState(false);
    return (
        <>
            <GlobalStyle />
            <div className="main-area">
                {
                    props.fileName ? <p>Selected File: {props.fileName} </p> :
                        <p className="main-area-title">Click to select a file <br />or <br />Drag and drop a file</p>
                }

            </div>
        </>
    )
}

const GlobalStyle = createGlobalStyle`
.main-area {
    width: 300px;
    height: 300px;
    border: 2px dashed white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-area-title {
    font-size: 1rem;
    text-align: center;
}
`;