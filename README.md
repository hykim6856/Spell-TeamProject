# Spring MVC 프로젝트 2024

## 기본 세팅

- [STS3 다운 및 템플릿 적용](https://github.com/callor/Callor-SpringMVC-Template-2024) 참고

- [WAS(Web Application Server)참고 하여 톰캣 서버 다운](https://github.com/callor/Reference/blob/master/MarkDownDocs/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A5%BC_%EC%9C%84%ED%95%9C_%EB%8F%84%EA%B5%AC.md) 적용은 인터넷 검색하면 잘 나와있음

- Run on Server 실행이 안뜰 경우 maven update 한 번 해보기.
- lombok은 저번에 설치할 때 오류나서 일단 설치 안해봄. 나중에 리스트 필요할때 고려

- 아마 세팅문제로 현재 run 하면 새창이아니라 프로그램안에서 창이 실행됨. 큰 문제는 없어서 그대로 하기로함.

### STS3 환경설정 세팅 쉽게하는 법

- 파일에 환경세팅 파일 참고

## 팀 repository 쓰는 법

```bash
git clone https://github.com/hykim6856/Spell-TeamProject.git
git checkout -b 닉네임
```

- 수정 후에 밑

```bash
git add .
git commit -m ""
git push origin 닉네임

```

- 첫 브랜치 생성 후엔 `git checkout 닉네임` 만 써도 됨. -b 빼도된단소리


## 만들어 놓은 것이 실행이 안될경우

### 맞춤법 검사기가 작동을 안할때
- passportkey 가 제대로 들어가있는지 확인
- 위 수정 후 js 업데이트 제대로 해보기

#### 자잘한 공유
- 엔터키 : 
```js        
event.inputType === "insertLineBreak"
```
