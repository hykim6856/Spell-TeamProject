"client";
import React from "react";

const SpellText = ({ text, setText }) => {
  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    console.log("Text changed to:", newText); // 변경된 텍스트를 출력합니다.
  };

  return (
    <div className="section">
      <h3>글씨 입력하기</h3>
      <form>
        <textarea
          id="inputText"
          name="text"
          rows="5"
          value={text} // 수정된 부분: value 속성을 text 상태로 설정
          onChange={handleChange}
        ></textarea>
        <p>
          현재 입력한 글자 수:{" "}
          <span id="currentChar">{text.length}</span> / 최대 글자 수:{" "}
          <span id="maxChar"></span>
        </p>
        <button id="showResultBtn" type="submit">
          결과 보기
        </button>
        <button className="delete">전부 지우기</button>
      </form>
    </div>
  );
};

export default SpellText;
