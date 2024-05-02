$(document).ready(function () {
  $("#inputText").focus();
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

  // 폼 제출 함수
  function submitForm() {
    document.getElementById("myForm").submit();
  }

  // 텍스트 입력 이벤트 핸들러
  document
    .getElementById("inputText")
    .addEventListener("input", function (event) {
      var text = event.target.value;
      var charCount = text.length;
      document.getElementById("currentChar").innerText = charCount;

      // 스페이스바, 점 또는 쉼표를 눌렀을 때 폼 제출
      var lastChar = text.charAt(charCount - 1);
      if (lastChar === " " || lastChar === "." || lastChar === ",") {
        submitForm();
      }
    });

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

  const inputText = textValue; // textValue 사용
  var passportKey = "19580ac709556cf2ce4842c705f7cac80d59953d";
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
});
