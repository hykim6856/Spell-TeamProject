import Image from "next/image";
import styles from "./main.css";
import SpellMain from "./comps/SpellMain";

export default function Home() {
  return (
    <main>
      <SpellMain />
    </main>
    // <div className="main">
    //   <header>
    //     <h1>Spelling Project</h1>
    //   </header>
    //   <section className="main">
    //     <aside className="left">
    //       <div className="section">
    //         <h3>글씨 입력하기</h3>
    //         <form>
    //           <textarea
    //             id="inputText"
    //             name="text"
    //             rows="5"
    //           ></textarea>
    //           <p>
    //             현재 입력한 글자 수: <span id="currentChar"></span> /
    //             최대 글자 수: <span id="maxChar"></span>
    //           </p>
    //           <button id="showResultBtn" type="submit">
    //             결과 보기
    //           </button>
    //           <button className="delete">전부 지우기</button>
    //         </form>
    //       </div>
    //       <div className="section ggi">
    //         <h3>맞춤법 검사 결과</h3>
    //         <div id="displayText"></div>
    //         <div className="check_area">
    //           <dl>
    //             <dt className="blind">붉은색 텍스트</dt>
    //             <dd>
    //               <span className="circle"></span>맞춤법
    //             </dd>
    //             <dt className="blind">보라색 택스트</dt>
    //             <dd>
    //               <span className="circle violet"></span>표준어의심
    //             </dd>
    //           </dl>
    //           <dl>
    //             <dt className="blind">녹색 텍스트</dt>
    //             <dd>
    //               <span className="circle green"></span>띄어쓰기
    //             </dd>
    //             <dt className="blind">파란색 택스트</dt>
    //             <dd>
    //               <span className="circle blue"></span>통계적교정
    //             </dd>
    //           </dl>
    //         </div>
    //       </div>
    //     </aside>
    //     <aside className="right">
    //       <div className="section">
    //         <h3>추천단어</h3>
    //         <ul id="nounList" className="nounList"></ul>
    //       </div>
    //       <div id="myModal" className="modal">
    //         <div className="modal-content">
    //           <span className="close">&times;</span>
    //           <ul id="modalWordsList"></ul>
    //         </div>
    //       </div>
    //     </aside>
    //   </section>
    // </div>
  );
}
