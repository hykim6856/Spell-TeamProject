import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./main.css";
import stylesm from "./modal.css";
import { useClient } from "next.js/client";

function MyComponent() {
  useClient();
  // 컴포넌트 내용
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [currentCharCount, setCurrentCharCount] = useState(0);
  const [maxChar] = useState(300); // 최대 글자 수

  useEffect(() => {
    // 네이버 맞춤법 검사 API 호출
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=${process.env.NAVER_PASSKEY}&q=${inputText}&color_blindness=0`
        );
        const data = await response.json();
        const htmlText = data.message.result.html;
        document.getElementById("displayText").innerHTML = htmlText;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 글자 수 업데이트
    setCurrentCharCount(inputText.length);

    // 네이버 API 호출
    if (inputText.trim() !== "") {
      fetchData();
    }
  }, [inputText]);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get("text");

    // 여기에 폼 제출에 대한 로직을 추가합니다.
    console.log("제출된 텍스트:", text);
    // 서버로 데이터를 보내거나 다른 작업을 수행합니다.
  };

  return (
    <div className="body">
      <header>
        <h1>Spelling Project</h1>
      </header>
      <section className="main">
        <aside className="left">
          <div className="section">
            <h3>글씨 입력하기</h3>
            <form onSubmit={submitForm}>
              <textarea
                id="inputText"
                name="text"
                rows="5"
                value={inputText}
                onChange={handleInputChange}
              ></textarea>
              <p>
                현재 입력한 글자 수:{" "}
                <span id="currentChar">{currentCharCount}</span> /
                최대 글자 수: <span id="maxChar">{maxChar}</span>
              </p>
              <button id="showResultBtn" type="submit">
                결과 보기
              </button>
              <button className="delete">전부 지우기</button>
            </form>
          </div>
          <div className="section ggi">
            <h3>맞춤법 검사 결과</h3>
            <div id="displayText"></div>
            <div className="check_area">
              <dl>
                <dt className="blind">붉은색 텍스트</dt>
                <dd>
                  <span className="circle"></span>맞춤법
                </dd>
                <dt className="blind">보라색 택스트</dt>
                <dd>
                  <span className="circle violet"></span>표준어의심
                </dd>
              </dl>
              <dl>
                <dt className="blind">녹색 텍스트</dt>
                <dd>
                  <span className="circle green"></span>띄어쓰기
                </dd>
                <dt className="blind">파란색 텍스트</dt>
                <dd>
                  <span className="circle blue"></span>통계적교정
                </dd>
              </dl>
            </div>
          </div>
        </aside>
        <aside className="right">
          <div className="section">
            <h3>추천단어</h3>
            <ul id="nounList" className="nounList"></ul>
          </div>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <ul id="modalWordsList"></ul>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
