"use server";
import fetch from "node-fetch";

export async function extractPassportKey() {
  try {
    const response = await fetch(
      "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=네이버맞춤법검사기"
    );
    const html = await response.text();

    const match = html.match(/passportKey=([a-zA-Z0-9]+)/);
    if (match) {
      const passportKey = decodeURIComponent(match[1]);
      console.log("Passport Key:", passportKey); // API 키를 콘솔에 출력
      return passportKey;
    } else {
      throw new Error("passportKey not found in HTML");
    }
  } catch (error) {
    console.error("Error extracting passportKey:", error);
    return null;
  }
}
