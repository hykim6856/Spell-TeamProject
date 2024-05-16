import { useEffect, useState } from "react";

const SpellResult = ({ text }) => {
  const [sres, setSres] = useState("");
  const [timer, setTimer] = useState(null);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              passportKey: "00eb157a0b1a05b6b7c633369935a9adcefa53e9", // 임시 passportKey
              q: currentText, // 현재 textarea에 있는 값으로 요청을 보냄
              color_blindness: 0,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            "네이버 맞춤법 검사 API 호출 중 문제가 발생했습니다."
          );
        }

        const data = await response.json();
        const result = data.message.result.html; // 결과에서 HTML 텍스트 추출

        setSres(result);

        console.log(result); // 콘솔에 결과 출력
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleInput = () => {
      clearTimeout(timer);
      setCurrentText(text); // 사용자가 입력하는 동안에는 현재 textarea에 있는 값을 계속 갱신
      setTimer(setTimeout(fetchData, 2000)); // 2초 후에 fetchData 함수 호출
    };

    const inputElement = document.getElementById("inputText");
    inputElement.addEventListener("input", handleInput);

    return () => {
      inputElement.removeEventListener("input", handleInput);
    };
  }, [text, timer, currentText]);

  return (
    <div
      id="displayText"
      dangerouslySetInnerHTML={{ __html: sres }}
    ></div>
  );
};

export default SpellResult;
