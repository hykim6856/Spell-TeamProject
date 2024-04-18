<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="rootPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>맞춤법 검사</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="${rootPath}/static/js/spell.js?2024-04-02-005"></script>
<style>
em.green_text {
	/* color: blue; */
	border-bottom:1px solid blue;
}

em.red_text {
	/* color: red; */
	border-bottom:1px solid red;
}
</style>
</head>
<body>
	<h1>Texty</h1>
	<textarea id="inputText" style="width: 500px; height: 500px;"></textarea>
	<p>
		현재 입력한 글자 수: <span id="currentChar">0</span> / 최대 글자 수: <span
			id="maxChar">300</span>
	</p>
	<button id="showResultBtn">결과 보기</button>
	<div id="displayText"></div>
	<h2>한국어 텍스트에서 명사 추출하기</h2>
	<form method="post">
		<textarea name="text" rows="5" cols="50"></textarea>
		<br> <input type="submit" value="추출">
	</form>
	<h1>Extracted Nouns</h1>
	<ul>
		<!-- 명사 리스트를 순회하며 출력 -->
		<c:forEach var="noun" items="${nouns}">
			<li>${noun}</li>
		</c:forEach>
	</ul>
</body>
</html>