"use server";
import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getSynonyms(word) {
  console.log("Word:", word); // word 값 로그로 출력

  if (!word) {
    throw new Error("Word is required");
  }

  const baseUrl = "https://ko.wiktionary.org/wiki/";
  const url = baseUrl + word;
  console.log("URL:", url); // word 값 로그로 출력

  try {
    const response = await fetch(url);

    // URL에 연결되었는지 확인
    if (!response.ok) {
      throw new Error("Failed to connect to the URL");
    }

    const html = await response.text();
    const $ = cheerio.load(html); // Cheerio 객체 생성

    const words = [];

    // 유의어를 가진 li 태그를 찾아서 단어 목록에 추가
    $("li").each((_, element) => {
      const text = $(element).text();
      if (
        text.includes("유의어") ||
        text.includes("합성어") ||
        text.includes("파생어")
      ) {
        const synonyms = text.split(":")[1].trim().split(", ");
        synonyms.forEach((synonym) => {
          words.push(synonym);
        });
      }
    });

    // 크롤링 결과 출력
    console.log("Crawling Result:", words);

    return words;
  } catch (error) {
    throw new Error("Error fetching synonyms: " + error.message);
  }
}
