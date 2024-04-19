$(document).ready(function () {
  const currentCharDisplay = document.getElementById("currentChar");
  const maxCharDisplay = document.getElementById("maxChar");
  const maxChar = 300; // 최대 글자 수

  // textarea 입력 시 글자 수 표시
  $("#inputText").on("input", function () {
    const text = $(this).val();
    const currentCharCount = text.length;
    if (currentCharCount > maxChar) {
      $(this).val(text.slice(0, maxChar)); // 최대 글자 수 초과 시 입력 막기
      currentCharDisplay.textContent = maxChar; // 현재 글자 수 표시
    } else {
      currentCharDisplay.textContent = currentCharCount; // 현재 글자 수 표시
    }
  });
  maxCharDisplay.textContent = maxChar;

  // URL에서 쿼리 파라미터 가져오기
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // 'text' 파라미터의 값 가져오기
  const textValue = urlParams.get("text");
  const currentCharCount = textValue.length;

  if (currentCharDisplay < 1) {
    currentCharDisplay.textContent = currentCharCount;
  }

  // 가져온 값 출력하기
  console.log(textValue);

  document.getElementById("inputText").value = textValue;
  // 폼 제출 이벤트 핸들러
  // $("form").submit(function (event) {
  const inputText = textValue; // textValue 사용
  var passportKey = "164b84ab05461401e2a0a1beffce4fe8562800b0";
  $.getJSON(
    "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy",
    {
      passportKey: passportKey,
      q: inputText,
      // where: "nexearch",
      color_blindness: 0,
    },
    function (data) {
      var htmlText = data.message.result.html;
      console.log(htmlText); // 결과를 콘솔에 출력
      $("#displayText").html(htmlText);
    }
  );
  // });
});
