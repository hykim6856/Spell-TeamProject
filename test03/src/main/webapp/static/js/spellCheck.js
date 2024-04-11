document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"); // 폼 요소를 가져옵니다.
  const inputField = document.querySelector("#word"); // 텍스트 입력 필드를 가져옵니다.
  var rootPath = "${pageContext.request.contextPath}";

  form.addEventListener("submit", async (event) => {
    // 폼 제출 이벤트를 감지합니다.
    event.preventDefault(); // 폼 제출 기본 동작을 막습니다.

    const userInput = inputField.value; // 사용자 입력 값을 가져옵니다.
    console.log("사용자 입력값:", userInput);

    // 맞춤법 검사 로직을 호출하고 입력값을 넘겨줍니다.
    const spellCheckResult = await getSpellCheckerResult(userInput);
    console.log("맞춤법 검사 결과:", spellCheckResult);
  });
  // 맞춤법 검사기 결과 호출
  const getSpellCheckerResult = async (stringToCheck) => {
    return new Promise((resolve, reject) => {
      let spellCheckerURL = `https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=${localStorage.getItem(
        "spellCheckerPassportKey"
      )}&_callback=mycallback&q=${stringToCheck}&where=nexearch&color_blindness=0&_=1643811632694`;

      const xhr = new XMLHttpRequest();
      xhr.open("GET", spellCheckerURL);
      xhr.onload = function () {
        if (xhr.status === 200) {
          const jsonData = xhr.responseText.match(/\{.*\}/)[0];
          const parsedData = JSON.parse(jsonData);
          const errorMessage = parsedData.message.error;

          // passportkey가 없거나 유효하지 않을 때 passportkey 업데이트
          if (errorMessage === "유효한 키가 아닙니다.") {
            getSpellCheckerPassportKey()
              .then(() => {
                spellCheckerURL = `https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=${localStorage.getItem(
                  "spellCheckerPassportKey"
                )}&_callback=mycallback&q=${stringToCheck}&where=nexearch&color_blindness=0&_=1643811632694`;
                const newXHR = new XMLHttpRequest();
                newXHR.open("GET", spellCheckerURL);
                newXHR.onload = function () {
                  if (newXHR.status === 200) {
                    resolve(newXHR.responseText);
                  } else {
                    reject(
                      new Error(
                        "Request failed with status:",
                        newXHR.status
                      )
                    );
                  }
                };
                newXHR.onerror = function () {
                  reject(new Error("Request failed"));
                };
                newXHR.send();
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            resolve(xhr.responseText);
          }
        } else {
          reject(
            new Error("Request failed with status:", xhr.status)
          );
        }
      };
      xhr.onerror = function () {
        reject(new Error("Request failed"));
      };
      xhr.send();
    });
  };

  // HTML로 파싱된 맞춤법 검사기 get
  const getParsedSpellCheckerResult = async (stringToCheck) => {
    let checkFinal = "";
    let checkerResultDataString = "";
    for (let i = 0; i < stringToCheck.length; i++) {
      if (stringToCheck[i] !== "") {
        try {
          const result = await getSpellCheckerResult(
            stringToCheck[i]
          );
          checkerResultDataString = result;
          checkerResultDataString = checkerResultDataString
            .replace("mycallback(", "")
            .replace(");", "");
          checkerResultDataString =
            JSON.parse(checkerResultDataString).message.result.html +
            "<br>";
          checkFinal = checkFinal + checkerResultDataString;
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
    return checkFinal;
  };

  // 맞춤법 검사기 passportkey 업데이트
  const getSpellCheckerPassportKey = async () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${rootPath}/passportKey`);
      xhr.onload = function () {
        if (xhr.status === 200) {
          localStorage.setItem(
            "spellCheckerPassportKey",
            JSON.parse(xhr.responseText).passportKey
          );
          resolve();
        } else {
          reject(
            new Error("Request failed with status:", xhr.status)
          );
        }
      };
      xhr.onerror = function () {
        reject(new Error("Request failed"));
      };
      xhr.send();
    });
  };

  // getParsedSpellCheckerResult 함수 외부에서 호출 가능하도록 export

  window.checkFinal = getParsedSpellCheckerResult;
});
