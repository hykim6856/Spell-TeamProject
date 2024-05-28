# Spelling Project

- 팀 프로젝트 맞춤법 검사기 `Spelling`
- 참여자 : [neck091](https://github.com/neck091/Biz-505-react-2024/tree/master/spellfix-new), [hykim6856](https://github.com/hykim6856)

### 구현기능

> 실시간 맞춤법 검사
>
> - api 에 무리가 가지 않는 선에서 타이핑 후 0.8 초간 다른 타이핑이 없을경우 실행 되도록 설정
> - 검사는 `네이버 맞춤법 검사기`를 활용. 네이버 맞춤법 검사기와 동일한 내용. 동일한 글자 수 한계를 가짐.

> 유사어 추천 기능
>
> - 오른쪽에 있는 박스에서 입력한 글자 중 단어만을 추출하여 리스트 출력
> - 출력된 리스트 요소를 클릭하면 해당 단어의 유사어들을 확인 할 수 있으며, 원하는 유사어 클릭 시 입력란에 있는 글자가 해당 단어로 대체됨.

> 기타 기능
>
> - 맞춤법 검사 결과를 한 번 누르면 결과가 글자 입력란에 반영이되고, 두 번 누르면 내용이 복사가 된다.
> - 글자 입력란의 글자를 모두 지우고 싶을 경우 모두 지우기 버튼을 누르면 입력된 모든 글자를 한 번에 지우게 됨.

## 테스트

#### 맞춤법 검사 테스트용 예시 문구

```
테스트:
이탈리아로 여헹가면 꼭 먹어봐야할 음식 중 하나는 살팀보카라는 음식이다.
기울어지는 글씨체는 흔히 이탤리 체로 불린다.
```

### 기타 공유 사항

<details>
<summary>
팀 repository 쓰는 법
</summary>

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

</details>
