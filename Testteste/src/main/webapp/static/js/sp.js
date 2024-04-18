document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("inputText");
  const currentCharDisplay = document.getElementById("currentChar");
  const maxCharDisplay = document.getElementById("maxChar");
  const maxChar = 500; // 최대 글자 수

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
  maxCharDisplay.textContent = maxChar; // 최대 글자 수 표시
});
