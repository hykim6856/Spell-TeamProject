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
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="${rootPath}/static/js/spell.js?2024-04-02-0200"></script>
<script>
//js  파일에서 사용할 rootPath 변수 선언
const rootPath = "${rootPath}"
</script>
<script src="${rootPath}/static/js/sp.js?2d024-042"></script>
<script src="${rootPath}/static/js/wtf.js?2d0s24-0d"></script>
<link rel="stylesheet" href="${rootPath}/static/css/main.css?2024-04-02-09">
<link rel="stylesheet" href="${rootPath}/static/css/modal.css?2024-04-2-09">
<link rel="stylesheet" href="${rootPath}/static/css/pretty.css?2024-04-25-11">

</head>
<body>
	<header>
		<h1>Spelling</h1>
	</header>

	<section class="main">
		<aside class="left">
			<div class="section">
				<p>글씨 입력하기</p>
				<form id="myForm" method="get">
					<textarea id="inputText" name="text" rows="5"></textarea>
					<p>
						현재 입력한 글자 수: <span id="currentChar">0</span> / 최대 글자 수: <span
							id="maxChar">300</span>
					</p>
					<button id="showResultBtn" type="submit">결과 보기</button>
				</form>

			</div>
			<div class="section">
				<p>맞춤법 검사 결과</p>
				<div id="displayText"></div>
			</div>
		</aside>
		<aside class="right">
			<div class="section">
				<p>추천단어</p>
				<ul id="nounList" class="nounList">
					<!-- 명사 리스트를 순회하며 출력 -->
					<c:forEach var="noun" items="${nouns}">
						<li class="hover" >${noun}</li>
					</c:forEach>
				</ul>
			</div>

			<!-- 모달 창 -->
			<div id="myModal" class="modal">
				<div class="modal-content">
					<span class="close">&times;</span>
					<ul id="modalWordsList"></ul>
				</div>
			</div>


			<div class="section">
				<p>관련어</p>
				<ul id="wordsList">
					<c:if test="${not empty words}">
						<c:forEach var="word" items="${words}">
							<li>${word}</li>
						</c:forEach>
					</c:if>
					<c:if test="${empty words}">
						<li>관련어가 없습니다.</li>
					</c:if>
				</ul>
			</div>
		</aside>
	</section>

</body>
</html>