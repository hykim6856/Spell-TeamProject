"use client";
// pages/qz.js

import React, { useState, useEffect } from "react";
import { fetchUpdatedContent } from "@/api/qz"; // 서버와의 통신을 위한 API 함수

const Qz = () => {
  const [content, setContent] = useState({ html: "", css: "" }); // HTML과 CSS 상태

  // 클릭 이벤트 핸들러
  const handleClick = async () => {
    try {
      // 클릭한 요소의 정보 가져오기
      const selectedElement =
        document.activeElement.tagName.toLowerCase();
      // 서버로 클릭한 요소 정보 전송하여 업데이트된 HTML과 CSS 가져오기
      const response = await fetchUpdatedContent(selectedElement);
      // 상태 업데이트
      setContent(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 클릭 이벤트를 감지하고 핸들러 실행
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div>
      {/* 웹 사이트 렌더링된 HTML 및 CSS 적용 */}
      <style>{content.css}</style>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  );
};

export default Qz;
