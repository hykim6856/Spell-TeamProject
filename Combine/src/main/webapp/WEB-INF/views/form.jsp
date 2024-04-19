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
<script src="${rootPath}/static/js/spell.js?2024-04-02-011"></script>

<style>
em.green_text {
	/* color: 띄어쓰기; */
	border-bottom:1px solid yellowgreen;
}
em.violet_text {
	/* 맞춤법 오류 의심 */
	border-bottom:1px solid violet;
}

em.red_text {
	/* color: 오타; */
	border-bottom:1px solid red;
}

em.blue_text {
	border-bottom:1px solid blue;
}
</style>
</head>
<body>
	<h1>Texty</h1>
	<form method="get">
	<textarea id="inputText" name="text"  rows="5" style="width: 500px; height: 500px;">${tests}</textarea>
	<p>
		현재 입력한 글자 수: <span id="currentChar">0</span> / 최대 글자 수: <span
			id="maxChar">300</span>
	</p>
	<button id="showResultBtn" type="submit" >결과 보기</button>
	</form>
	<p>결과출력</p>
	<div id="displayText"></div>

	<ul>
		<!-- 명사 리스트를 순회하며 출력 -->
		<c:forEach var="noun" items="${nouns}">
			<li>${noun}</li>
		</c:forEach>
	</ul>
</body>
</html>