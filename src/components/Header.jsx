"use client";

import { createGlobalStyle } from "styled-components";
import Lottie from 'react-lottie-player';
import fileTransfer from './../../public/assets/file-transfer.json';

export default function Header() {
  return (
    <>
      <div>
        <GlobalStyle />
        <header className="header">
          <a href="/">
            <div className="header-main">
              <Lottie
                loop
                animationData={fileTransfer}
                play
                style={{ width: 90, height: 90, marginRight: 10 }}
              />
              <div className="title">
                <h1>weShare</h1>
              </div>
            </div>
          </a>
        </header>
        <div className="horizontal-line"></div>
      </div>
    </>
  );
}

const GlobalStyle = createGlobalStyle`

.header-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0 20px 0;
}

.title h1 {
  display: flex;
  align-items: center;
  color: cyan !important;
  font-size: 3rem;
}

a {
  text-decoration: none;
  color: white;
}

.horizontal-line {
  border: 1.4px solid grey;
}
`;