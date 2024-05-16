"use client";

const SpellText = ({ text, setText }) => {
  const debounce = (callback, delay = 200) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(
        () => callback.apply(this, args),
        delay
      );
    };
  };

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };
  const onDebouncehander = debounce(onChangeHandler, 100);
  return (
    <div className="section">
      <h3>글씨 입력하기</h3>
      <form>
        <textarea
          id="inputText"
          name="text"
          rows="5"
          defaultValue={text}
          onChange={onDebouncehander}
        ></textarea>
        <p>
          현재 입력한 글자 수: <span id="currentChar"></span> / 최대
          글자 수: <span id="maxChar"></span>
        </p>
        <button id="showResultBtn" type="submit">
          결과 보기
        </button>
        <button className="delete">전부 지우기</button>
      </form>
    </div>
  );
};
export default SpellText;
