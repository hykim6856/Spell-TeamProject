$(document).ready(function () {
  // 입력 필드에 입력 중일 때 밑줄 추가
  $("#inputText").on("input", function () {
    var inputText = $(this).val();
    addUnderline(inputText);
  });

  const textarea = document.getElementById("inputText");
  const currentCharDisplay = document.getElementById("currentChar");
  const maxCharDisplay = document.getElementById("maxChar");
  const maxChar = 300; // 최대 글자 수

  textarea.addEventListener("input", function () {
    const text = textarea.value;
    const currentCharCount = text.length;
    if (currentCharCount > maxChar) {
      textarea.value = text.slice(0, maxChar); // 최대 글자 수 초과 시 입력 막기
      currentCharDisplay.textContent = maxChar; // 현재 글자 수 표시
    } else {
      currentCharDisplay.textContent = currentCharCount; // 현재 글자 수 표시
    }
  });
  maxCharDisplay.textContent = maxChar;

  // 버튼을 클릭할 때 네이버 맞춤법 검사 결과를 표시하는 함수
  $("#showResultBtn").click(function () {
    var inputText = $("#inputText").val();
    var passportKey = "0302d2240c6eafd7b555f42ceaab43083ad92697";
    $.getJSON(
      "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=" +
        passportKey +
        "&q=" +
        inputText +
        "&where=nexearch&color_blindness=0",
      function (data) {
        var htmlText = data.message.result.html;
        console.log(htmlText);
        $("#displayText").html(htmlText);
      }
    );
  });
});
