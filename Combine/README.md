# Spring MVC 프로젝트 2024

## 기본 세팅

- [STS3 다운 및 템플릿 적용](https://github.com/callor/Callor-SpringMVC-Template-2024) 참고

- [WAS(Web Application Server)참고 하여 톰캣 서버 다운](https://github.com/callor/Reference/blob/master/MarkDownDocs/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A5%BC_%EC%9C%84%ED%95%9C_%EB%8F%84%EA%B5%AC.md) 적용은 인터넷 검색하면 잘 나와있음

- Run on Server 실행이 안뜰 경우 maven update 한 번 해보기.
- lombok은 저번에 설치할 때 오류나서 일단 설치 안해봄. 나중에 리스트 필요할때 고려

- 아마 세팅문제로 현재 run 하면 새창이아니라 프로그램안에서 창이 실행됨. 큰 문제는 없어서 그대로 하기로함.

### STS3 환경설정 세팅 쉽게하는 법

- 파일에 [환경세팅 파일](https://github.com/hykim6856/Spell-TeamProject/tree/master/%ED%99%98%EA%B2%BD%EC%84%B8%ED%8C%85) 참고

## 만들어 놓은 것이 실행이 안될경우

### VO가 분명있는데 없다고 할경우

- 현재 lombok 이 설치되어있는지 확인하기(pom.xml에 적은것 말고 따로 설치도 필요함.)
- clean 해보기

### 맞춤법 검사기가 작동을 안할때

- passportkey 가 제대로 들어가있는지 확인
- 위 수정 후 js 업데이트 제대로 해보기
