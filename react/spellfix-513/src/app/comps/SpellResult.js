import { useEffect, useState } from "react";

const SpellResult = ({ text }) => {
  const [sres, setSres] = useState("");
  const [timer, setTimer] = useState(null);
  const [currentText, setCurrentText] = useState(text);

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
              passportKey: "4181eddd21f352d39304deefefbbb7353443323b", // 임시 passportKey
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
      setCurrentText(newText); // 사용자가 입력하는 동안에는 현재 textarea에 있는 값을 계속 갱신
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          fetchData(newText);
        }, 800)
      ); // 800ms 후에 fetchData 함수 호출
    };

    const inputElement = document.getElementById("inputText");
    inputElement.addEventListener("input", handleInput);

    return () => {
      inputElement.removeEventListener("input", handleInput);
    };
  }, [timer]);

  return (
    <div
      id="displayText"
      dangerouslySetInnerHTML={{ __html: sres }}
    ></div>
  );
};

export default SpellResult;

// const url = "https://search.naver.com/search.naver?where=nexearch&sm=top_sly.hst&fbm=0&acr=1&ie=utf8&query=%EB%84%A4%EC%9D%B4%EB%B2%84+%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0";

// // URL에서 쿼리 파라미터 추출
// const queryParams = new URLSearchParams(url.split('?')[1]);

// // passport 키 추출
// const passportKey = queryParams.get('passport');

// console.log(passportKey);
