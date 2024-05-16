"use server";
import https from "https";

// 패스포트 키
const passportKey = "7a4261de29cbc4dd354c734990fa09f435280cef";

export const spellCheck = async (text) => {
  try {
    // 네이버 API의 엔드포인트
    const spellCheckEndpoint =
      "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=네이버맞춤법검사기";

    // 네이버 API에 GET 요청을 보내기 위한 쿼리 매개변수
    const queryParams = new URLSearchParams({
      passportKey: passportKey,
      q: text,
      color_blindness: 0,
    });

    // 네이버 API에 GET 요청을 보냄
    const response = await new Promise((resolve, reject) => {
      https
        .get(`${spellCheckEndpoint}?${queryParams}`, (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    // 네이버 API에서 받은 응답을 반환
    console.log("ㄱㄱ", response);
    return response;
  } catch (error) {
    // 에러 처리
    console.error("Error fetching spell check result:", error);
    throw new Error("Internal Server Error");
  }
};
