const path = document.location.pathname;
// pathname 을 슬래시(/) 를 기준으로 단어단위로 자르기
const pathArr = path.split("/");
// localhost:8080/gallery/ 로 끝나면 localhost:8080/gallery/home 이라고 만들어라
pathArr[pathArr.length - 1] || pathArr.push("home");

//현재화면의 url
window.location.href;
