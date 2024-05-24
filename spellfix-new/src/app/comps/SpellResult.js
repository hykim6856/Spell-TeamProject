import { useEffect, useState, useRef } from "react";
import { extractPassportKey } from "@/api/key";

const SpellResult = ({ text }) => {
  const [sres, setSres] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchData = async (textToCheck) => {
      try {
        const passportKey = await extractPassportKey(); // API 키 추출
        const response = await fetch(
          "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              passportKey: passportKey,
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

        console.log(result);
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

  return (
    <div
      id="displayText"
      dangerouslySetInnerHTML={{ __html: sres }}
    ></div>
  );
};

export default SpellResult;
