// document.addEventListener("DOMContentLoaded", function () {
//   var nounList = document.getElementById("nounList");
//   nounList.addEventListener("click", function (event) {
//     if (event.target.tagName === "LI") {
//       var noun = event.target.textContent;
//       var xhr = new XMLHttpRequest();
//       xhr.open(
//         "GET",
//         `${rootPath}/words?word=` + encodeURIComponent(noun)
//       );
//       xhr.onload = function () {
//         if (xhr.status === 200) {
//           var data = JSON.parse(xhr.responseText);
//           var modalWordsList =
//             document.getElementById("modalWordsList");
//           modalWordsList.innerHTML = ""; // 기존 목록 비우기
//           if (data.length > 0) {
//             data.forEach(function (word) {
//               var li = document.createElement("li");
//               li.textContent = word;
//               modalWordsList.appendChild(li); // 새로운 항목 추가
//             });
//           } else {
//             var li = document.createElement("li");
//             li.textContent = "관련어가 없습니다.";
//             modalWordsList.appendChild(li);
//           }
//           openModal(); // 모달 창 열기
//         } else {
//           console.error("Request failed. Status:", xhr.status);
//         }
//       };
//       xhr.onerror = function () {
//         console.error("Request failed. Network error");
//       };
//       xhr.send();
//     }
//   });

//   // 모달 창 열기
//   function openModal() {
//     document.getElementById("myModal").style.display = "block";
//   }

//   // 모달 창 닫기
//   document
//     .querySelector("#myModal .close")
//     .addEventListener("click", function () {
//       closeModal(); // 모달 창 닫기
//     });

//   // 모달 바깥 영역 클릭 시 모달 창 닫기
//   window.addEventListener("click", function (event) {
//     if (event.target === document.getElementById("myModal")) {
//       closeModal(); // 모달 창 닫기
//     }
//   });

//   // 모달 창 닫기
//   function closeModal() {
//     document.getElementById("myModal").style.display = "none";
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  var nounList = document.getElementById("nounList");
  var modalWordsList = document.getElementById("modalWordsList");

  nounList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      var noun = event.target.textContent;
      fetchData(noun);
      openModal(); // 모달 창 열기
    }
  });

  function fetchData(noun) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${rootPath}/words?word=` + encodeURIComponent(noun)
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        modalWordsList.innerHTML = ""; // 기존 목록 비우기
        if (data.length > 0) {
          data.forEach(function (word) {
            var li = document.createElement("li");
            li.textContent = word;
            modalWordsList.appendChild(li); // 새로운 항목 추가
          });
        } else {
          var li = document.createElement("li");
          li.textContent = "관련어가 없습니다.";
          modalWordsList.appendChild(li);
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error("Request failed. Network error");
    };
    xhr.send();
  }

  // 모달 창 열기
  function openModal() {
    document.getElementById("myModal").style.display = "block";
  }

  // 모달 창 닫기
  document
    .querySelector("#myModal .close")
    .addEventListener("click", function () {
      closeModal(); // 모달 창 닫기
    });

  // 모달 바깥 영역 클릭 시 모달 창 닫기
  window.addEventListener("click", function (event) {
    if (event.target === document.getElementById("myModal")) {
      closeModal(); // 모달 창 닫기
    }
  });

  // 모달 창 닫기
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
});
