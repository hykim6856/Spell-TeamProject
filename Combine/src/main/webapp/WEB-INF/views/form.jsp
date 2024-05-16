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
<script src="${rootPath}/static/js/spell.js?2024-04-02-0sd2"></script>
<script>
	const rootPath = "${rootPath}"
	const PASSKEY = "${PASSPORT}";
</script>
<script src="${rootPath}/static/js/pop.js?d224-0d4d2f"></script>
<link rel="stylesheet"
	href="${rootPath}/static/css/main.css?204-04-0-09">
<link rel="stylesheet"
	href="${rootPath}/static/css/modal.css?202d4-04-2-09">
<link rel="stylesheet"
	href="${rootPath}/static/css/naver.css?202d4-04-2-09">
<style>
em.green_text {
	/* color: 띄어쓰기; */
	border-bottom: 1px solid yellowgreen;
}

em.violet_text {
	/* 맞춤법 오류 의심 */
	border-bottom: 1px solid violet;
}

em.red_text {
	/* color: 오타; */
	border-bottom: 1px solid red;
}

em.blue_text {
	border-bottom: 1px solid blue;
}
</style>

</head>
<body>
	<header>
		<h1>Spelling Project</h1>
	</header>

	<section class="main">
		<aside class="left">
			<div class="section">
				<h3>글씨 입력하기</h3>
				<form id="myForm" method="get">
					<textarea id="inputText" name="text" rows="5"></textarea>
					<p>
						현재 입력한 글자 수: <span id="currentChar">0</span> / 최대 글자 수: <span
							id="maxChar">300</span>
					</p>
					<button id="showResultBtn" type="submit">결과 보기</button>
					<button class="delete">전부 지우기</button>
				</form>

			</div>
			<div class="section ggi">
				<h3>맞춤법 검사 결과</h3>
				<div id="displayText">${result}</div>

				<div class="check_area">
					<dl>
						<dt class="blind">붉은색 텍스트</dt>
						<dd>
							<span class="circle"></span>맞춤법
						</dd>
						<dt class="blind">보라색 택스트</dt>
						<dd>
							<span class="circle violet"></span>표준어의심
						</dd>
					</dl>
					<dl>
						<dt class="blind">녹색 텍스트</dt>
						<dd>
							<span class="circle green"></span>띄어쓰기
						</dd>
						<dt class="blind">파란색 택스트</dt>
						<dd>
							<span class="circle blue"></span>통계적교정
						</dd>
					</dl>
				</div>
			</div>
		</aside>
		<aside class="right">
			<div class="section">
				<h3>추천단어</h3>
				<ul id="nounList" class="nounList">
					<!-- 명사 리스트를 순회하며 출력 -->
					<c:forEach var="noun" items="${nouns}">
						<li class="hover">${noun}</li>
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
		</aside>
	</section>

</body>
</html>