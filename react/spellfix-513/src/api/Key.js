const https = require("https");

const url =
  "https://search.naver.com/search.naver?where=nexearch&sm=top_sly.hst&fbm=0&acr=1&ie=utf8&query=%EB%84%A4%EC%9D%B4%EB%B2%84+%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0";

// URL로부터 HTML을 가져와서 passport 키를 추출하는 함수
function extractPassportKeyFromUrl() {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = "";

      // 데이터를 수신할 때마다 조각 조각 모으기
      res.on("data", (chunk) => {
        data += chunk;
      });

      // 전체 응답을 수신했을 때 실행
      res.on("end", () => {
        // JavaScript 코드 추출하기
        const matches = data.match(/passportKey\s*:\s*["'](\w+)["']/);

        // 패스포트 키가 발견되면 resolve 호출
        if (matches && matches[1]) {
          resolve(matches[1]);
          console.log("Extracted Passport Key:", matches[1]); // 콘솔에 로그 추가
        } else {
          reject("Passport key not found.");
        }
      });
    });

    // 요청 에러 처리
    req.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = { extractPassportKeyFromUrl };
