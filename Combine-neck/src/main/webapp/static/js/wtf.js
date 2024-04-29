document.addEventListener("DOMContentLoaded", function () {
  // textarea 요소와 다른 필요한 요소들을 DOM으로부터 가져옴
  var textarea = document.getElementById("inputText");
  var nounList = document.getElementById("nounList");
  var modalWordsList = document.getElementById("modalWordsList");
  var currentCharDisplay = document.getElementById("currentChar");
  var maxCharDisplay = document.getElementById("maxChar");
  var submitBtn = document.getElementById("showResultBtn");

  // 최대 글자 수 설정
  var maxChar = 300;
  maxCharDisplay.textContent = maxChar;

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
  });

  // 명사 리스트에서 클릭 이벤트 리스너 추가
  nounList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      var selectedWord = event.target.textContent;
      replaceWordWithNoun(selectedWord);
    }
  });

  // 모달 리스트에서 클릭 이벤트 리스너 추가
  modalWordsList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      var selectedWord = event.target.textContent;
      replaceWordWithNoun(selectedWord);
      closeModal(); // 모달 닫기
    }
  });

  // 폼 제출 함수
  function submitForm() {
    document.getElementById("myForm").submit();
  }

  // 단어 교체 함수
  function replaceWordWithNoun(selectedWord) {
    var sentence = textarea.value; // 텍스트 에어리어의 문장
    var nouns = []; // 텍스트 에어리어에서 추출된 명사 목록

    // 추출된 명사 목록에서 선택한 단어와 일치하는 명사를 찾아 교체
    for (var i = 0; i < nouns.length; i++) {
      if (nouns[i] === selectedWord) {
        // 명사를 선택한 단어로 교체
        sentence = sentence.replace(nouns[i], selectedWord);
      }
    }

    // 교체된 문장을 텍스트 에어리어에 설정
    textarea.value = sentence;
  }

  // 모달 창 닫기 함수
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
});
