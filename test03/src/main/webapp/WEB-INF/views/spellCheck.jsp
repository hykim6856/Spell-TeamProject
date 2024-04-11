<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="rootPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>맞춤법 검사</title>

<script src="${rootPath}/static/js/spellCheck.js"></script>
</head>
<body>

	<form method="POST">
		<label for="word">단어 입력:</label> <input type="text" id="word"
			name="word">
		<button type="submit">검사</button>
	</form>

	<h2>맞춤법 검사 결과</h2>


	<p>입력값: ${word}</p>
	<p>검사 결과: ${result}</p>
	<p>검사 결과: ${parsedSpellCheckerResult}</p>
	<div id="spellCheckResult"></div>


	<a href="${rootPath}/">홈으로 돌아가기</a>



</body>
</html>