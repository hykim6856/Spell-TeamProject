import { useEffect, useState, useRef } from "react";

const SpellResult = ({ text }) => {
  const [sres, setSres] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchData = async (textToCheck) => {
      try {
        const response = await fetch(
          "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              passportKey: "6010591716c5633888b73834fe89367c4499cfaa", // 임시 passportKey
              q: textToCheck, // 현재 textarea에 있는 값으로 요청을 보냄
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

    const handleInput = (event) => {
      const newText = event.target.value;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fetchData(newText);
      }, 800); // 800ms 후에 fetchData 함수 호출
    };

    const inputElement = document.getElementById("inputText");
    inputElement.addEventListener("input", handleInput);

    return () => {
      inputElement.removeEventListener("input", handleInput);
      clearTimeout(timerRef.current); // 컴포넌트 언마운트 시 타이머 클리어
    };
  }, []);

  return (
    <div
      id="displayText"
      dangerouslySetInnerHTML={{ __html: sres }}
    ></div>
  );
};

export default SpellResult;
