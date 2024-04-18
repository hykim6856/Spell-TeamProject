<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="rootPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>네이버 맞춤법 검사 결과</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="${rootPath}/static/js/sp.js?2024-04-02-005"></script>
<script type="text/javascript">
  $(document).ready(function() {
    // 입력 필드에 입력 중일 때 밑줄 추가
    $('#inputText').on('input', function() {
      var inputText = $(this).val();
      addUnderline(inputText);
    });

    // 텍스트에 밑줄 추가하는 함수
   /*  function addUnderline(text) {
      $('#displayText').html('<span style="text-decoration: underline red;">' + text + '</span>');
    } */

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
    $("#showResultBtn").click(function() {
      var inputText = $('#inputText').val();
      var passportKey = "5496c35ef39c4f74e482a25efd18eaf5e92ac3fc";
      $.getJSON("https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=" 
    		  + passportKey + "&q=" 
    		  + inputText + "&where=nexearch&color_blindness=0", 
    		  function(data) {
        var htmlText = data.message.result.html;
        console.log(htmlText);
        $("#displayText").html(htmlText);
        
      });
    });
  });
</script>
<style>
  em.green_text {
    color: blue;
  }
  em.red_text {
    color: red;
  }
</style>
</head>
<body>
<h1>Hello!! Korea</h1>
<textarea id="inputText" style="width: 500px; height: 500px;"></textarea>
<p>현재 입력한 글자 수: <span id="currentChar">0</span> / 최대 글자 수: <span id="maxChar">300</span></p>
<button id="showResultBtn">결과 보기</button>
<div id="displayText"></div>
</body>
</html>
