import { useEffect, useState, useRef } from "react";
import { extractPassportKey } from "@/api/key";

const SpellResult = ({ text, setText }) => {
  const [sres, setSres] = useState("");
  const timerRef = useRef(null);
  const passportKeyRef = useRef(null);

  useEffect(() => {
    const fetchData = async (textToCheck) => {
      try {
        if (!passportKeyRef.current) {
          passportKeyRef.current = await extractPassportKey(); // API 키 추출
          console.log(
            "Extracted Passport Key:",
            passportKeyRef.current
          ); // API 키를 콘솔에 출력
        }
        const response = await fetch(
          "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              passportKey: passportKeyRef.current,
              q: textToCheck,
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
        const result = data.message.result.html;

        setSres(result);

        console.log("Spell Check Result:", result); // 결과를 콘솔에 출력
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleInput = (event) => {
      const newText = event.target.value;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fetchData(newText);
      }, 800);
    };

    const inputElement = document.getElementById("inputText");
    inputElement.addEventListener("input", handleInput);

    return () => {
      inputElement.removeEventListener("input", handleInput);
      clearTimeout(timerRef.current);
    };
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .catch((error) =>
        console.error("텍스트 복사 중 오류 발생:", error)
      );
  };

  const handleDoubleClick = () => {
    // 더블클릭 이벤트 처리 코드
    const textWithoutHtml = sres.replace(/<[^>]*>?/gm, "");
    copyToClipboard(textWithoutHtml);
    alert("복사되었습니다.");
  };

  const handleClick = () => {
    const textWithoutHtml = sres.replace(/<[^>]*>?/gm, "");
    const newText = textWithoutHtml;
    setText(newText);
  };

  return (
    <div
      id="displayText"
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: sres }}
    ></div>
  );
};

export default SpellResult;
