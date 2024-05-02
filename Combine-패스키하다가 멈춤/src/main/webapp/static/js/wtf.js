document.addEventListener("DOMContentLoaded", function () {
  // 단어 교체 함수
  function replaceWordWithNoun(selectedWord) {
    var sentence = textarea.value; // 텍스트 에어리어의 문장
    var replacedSentence = sentence.replace(
      /\b\w+\b/g,
      function (word) {
        return word === selectedWord ? selectedWord : word;
      }
    );
    // 교체된 문장을 텍스트 에어리어에 설정
    textarea.value = replacedSentence;
  }

  // textarea 입력 이벤트 리스너 추가
  textarea.addEventListener("input", function (event) {
    var text = event.target.value;
    var charCount = text.length;
    currentCharDisplay.innerText = charCount;

    // 스페이스바, 점 또는 쉼표를 눌렀을 때 폼 제출
    var lastChar = text.charAt(charCount - 1);
    if (lastChar === " " || lastChar === "." || lastChar === ",") {
      submitForm();
    }

    // 텍스트 에어리어에서 명사 추출
    var nouns = extractNouns(text);
    displayNouns(nouns);
  });
});
