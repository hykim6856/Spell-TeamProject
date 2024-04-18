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
	  <h2>한국어 텍스트에서 명사 추출하기</h2>
    <form method="post">
        <textarea name="text" rows="5" cols="50"></textarea><br>
        <input type="submit" value="추출">
    </form>
</body>
</html>