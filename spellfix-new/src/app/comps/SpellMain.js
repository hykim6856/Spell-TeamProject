"use client";
import React, { useState } from "react";
import SpellText from "./SpellText";
import SpellResult from "./SpellResult";
import NounList from "./NounList";
import Modal from "./Modal";

const SpellMain = () => {
  const [text, setText] = useState("");
  const [word, setWord] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWordClick = (clickedWord) => {
    setWord(clickedWord);
    setIsModalOpen(true);
  };

  const handleSynonymClick = (synonym) => {
    setText((prevText) => {
      let replacedText = prevText;
      let index = replacedText.indexOf(word);
      while (index !== -1) {
        replacedText =
          replacedText.substring(0, index) +
          synonym +
          replacedText.substring(index + word.length);
        index = replacedText.indexOf(word, index + synonym.length);
      }
      console.log("Replaced text:", replacedText); // 대체된 텍스트 콘솔에 출력
      return replacedText;
    });
    setIsModalOpen(false); // 모달 닫기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="main">
      <header>
        <h1>Spelling Project</h1>
      </header>
      <section className="main">
        <aside className="left">
          <SpellText text={text} setText={setText} />
          <div className="section ggi">
            <h3>맞춤법 검사 결과</h3>
            <SpellResult text={text} />
            <div className="check_area">
              <dl>
                <dt className="blind">붉은색 텍스트</dt>
                <dd>
                  <span className="circle"></span>맞춤법
                </dd>
                <dt className="blind">보라색 텍스트</dt>
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
          <NounList text={text} setWord={handleWordClick} />
          {isModalOpen && (
            <Modal
              word={word}
              onSynonymClick={handleSynonymClick}
              onClose={handleModalClose}
            />
          )}
        </aside>
      </section>
    </div>
  );
};

export default SpellMain;
