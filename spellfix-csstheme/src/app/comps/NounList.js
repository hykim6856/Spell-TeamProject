"use client";
import { useState, useEffect } from "react";
import { fetchNouns } from "@/api/nouns"; // 경로를 실제 파일 위치에 맞게 조정하세요.

const NounList = ({ text, setWord }) => {
  const [nouns, setNouns] = useState([]);

  useEffect(() => {
    const fetchAndSetNouns = async () => {
      try {
        const extractedNouns = await fetchNouns(text); // 1. await 키워드 사용
        setNouns(extractedNouns); // 2, 3. setNouns에 비동기 함수의 반환값 사용
      } catch (error) {
        console.error("Error fetching nouns:", error);
      }
    };

    if (text) {
      fetchAndSetNouns();
    }
  }, [text]);

  return (
    <div className="section">
      <h3>추천 단어</h3>
      <ul id="nounList" className="nounList">
        {nouns.map((noun, index) => (
          <li key={index} onClick={() => setWord(noun)}>
            {noun}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NounList;
