"use server";
// /pages/api/passportKey.js

import https from "https";

async function fetchPassportKey() {
  try {
    const url =
      "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=네이버맞춤법검사기";
    const response = await new Promise((resolve, reject) => {
      https
        .get(url, (response) => resolve(response))
        .on("error", reject);
    });

    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    return new Promise((resolve, reject) => {
      response.on("end", () => {
        const match = data.match(/passportKey=([a-zA-Z0-9]+)/);
        const passportKey = match ? match[1] : null;
        resolve(passportKey);
      });
    });
  } catch (error) {
    console.error("Error fetching passport key:", error);
    return null;
  }
}

export default async function spellCheck(text) {
  try {
    const { inputText } = req.body;
    const passportKey = await fetchPassportKey();

    if (!passportKey) {
      return res
        .status(500)
        .json({ error: "Failed to fetch passport key" });
    }

    const url =
      "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy";
    const spellCheckResponse = await new Promise(
      (resolve, reject) => {
        const postData = JSON.stringify({
          passportKey: passportKey,
          q: inputText,
          color_blindness: 0,
        });

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": postData.length,
          },
        };

        const request = https.request(url, options, (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            resolve(data);
          });
        });

        request.on("error", (error) => {
          reject(error);
        });

        request.write(postData);
        request.end();
      }
    );

    res.status(200).json({ spellCheckResult: spellCheckResponse });
  } catch (error) {
    console.error("Error fetching spell check result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
