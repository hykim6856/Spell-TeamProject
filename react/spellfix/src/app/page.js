import Image from "next/image";
import styles from "./main.css";
import stylesm from "./modal.css";

import React, { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState(""); // 입력 텍스트 상태
  const [resultHtml, setResultHtml] = useState(""); // 네이버 API 결과 HTML 상태

  // 네이버 API 호출 함수
  const fetchSpellCheck = async () => {
    try {
      const response = await fetch(
        `https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=00eb157a0b1a05b6b7c633369935a9adcefa53e9&q=${inputText}&color_blindness=0`
      );
      const data = await response.json();
      const htmlText = data.message.result.html;
      setResultHtml(htmlText); // 결과 HTML 상태 업데이트
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 텍스트 입력 변경 핸들러
  const handleInputChange = (event) => {
    setInputText(event.target.value); // 입력 텍스트 상태 업데이트
  };

  // 폼 제출 핸들러
  const submitForm = (event) => {
    event.preventDefault(); // 폼 기본 동작 방지
    // 네이버 API 호출
    if (inputText.trim() !== "") {
      fetchSpellCheck();
    }
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
            <form onSubmit="{submitForm}">
              <textarea
                id="inputText"
                name="text"
                rows="5"
                value="{inputText}"
                onChange="{handleInputChange}"
              ></textarea>
              <p>
                현재 입력한 글자 수:{" "}
                <span id="currentChar">"currentCharCount"</span>
                최대 글자 수: <span id="maxChar">"maxChar"</span>
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
