"use server";
const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
const access_key = "4d805f57-49f5-45a9-bbff-86eb6a563ad4"; // API 키
const analysisCode = "morp"; // 언어 분석 코드 선택

export async function fetchNouns(text) {
  const requestJson = {
    argument: {
      text: text,
      analysis_code: analysisCode,
    },
  };

  try {
    const response = await fetch(openApiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_key,
      },
      body: JSON.stringify(requestJson),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    if (result.result === 0) {
      const nouns = [];
      const sentences = result.return_object.sentence;
      sentences.forEach(function (sentence) {
        sentence.morp.forEach(function (morp) {
          if (morp.type === "NNG" || morp.type === "NNP") {
            nouns.push(morp.lemma);
          }
        });
      });

      return nouns;
    } else {
      console.error("Error:", result.reason);
      throw new Error(result.reason);
    }
  } catch (error) {
    console.error("Failed to analyze text:", error);
    throw error;
  }
}
