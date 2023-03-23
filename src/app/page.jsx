"use client";

import Header from '@/components/Header';
import Lottie from 'react-lottie-player'
import arrow from './../../public/assets/arrow.json';
import { createGlobalStyle } from "styled-components";

export default function Home() {
  return (
    <>
      <Header />
      <GlobalStyle />
      <div className="main">
        <div className="options">
          <a href="/download">
            <div className="option">
              <Lottie
                loop
                animationData={arrow}
                play
                style={{ width: 100, height: 100, transform: 'rotate(90deg)' }}
              />
              <h1 className='option-title'>Download</h1>
            </div>
          </a>
          <p style={{ fontSize: 40, fontWeight: 700, color: "white", textAlign: "center", marginBottom: 20 }}>or</p>
          <a href="/upload">
            <div className="option">
              <Lottie
                loop
                animationData={arrow}
                play
                style={{ width: 70.8, height: 100, transform: 'rotate(-90deg)' }}
              />
              <h1 className='option-title'>Upload</h1>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

const GlobalStyle = createGlobalStyle`

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.options {
margin-top: 8%;
}

.option {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid cyan;
  margin-bottom: 25px;
}

.option-title {
  font-size: 40px;
  color: cyan;
  margin-right: 10%;
}

@media only screen and (max-width: 768px) {
  .options {
    margin-top: 20%;
  }
}
`;
