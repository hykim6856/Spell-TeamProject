"use client";
import React, { useState, useEffect } from "react";
import { getSynonyms } from "@/api/pop"; // 경로를 실제 파일 위치에 맞게 조정하세요.

const Modal = ({ word, onSynonymClick, onClose }) => {
  const [synonyms, setSynonyms] = useState([]);

  useEffect(() => {
    const fetchSynonyms = async () => {
      try {
        const synonyms = await getSynonyms(word);
        setSynonyms(synonyms);
      } catch (error) {
        console.error("Error fetching synonyms:", error);
      }
    };

    fetchSynonyms();
  }, [word]);

  const handleSynonymClick = (synonym) => {
    console.log("Clicked synonym:", synonym); // 클릭한 유의어를 출력합니다.
    onSynonymClick(synonym);
    onClose(); // 모달을 닫습니다.
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{word}의 유의어</h2>
        <ul id="modalWordsList">
          {synonyms.map((synonym, index) => (
            <li
              key={index}
              onClick={() => handleSynonymClick(synonym)}
            >
              {synonym}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
