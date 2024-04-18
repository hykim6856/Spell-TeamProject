<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="rootPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>여기는 제목</title>
</head>
<body>
	<h1>Extracted Nouns</h1>
    <ul>
        <!-- 명사 리스트를 순회하며 출력 -->
        <c:forEach var="noun" items="${nouns}">
            <li>${noun}</li>
        </c:forEach>
    </ul>
</body>
</html>