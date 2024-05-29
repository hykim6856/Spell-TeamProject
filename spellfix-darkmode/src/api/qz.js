"use server";
// 필요한 패키지 및 모듈 불러오기
import { launch } from "puppeteer";

// 브라우저 및 페이지 인스턴스 변수 선언
let browser;
let page;

// 브라우저 초기화 함수
const initializeBrowser = async () => {
  browser = await launch();
  page = await browser.newPage(); // 새 페이지 생성
};

// 브라우저 종료 함수
const closeBrowser = async () => {
  if (browser) {
    await browser.close();
  }
};

// 특정 요소를 클릭하고 업데이트된 HTML 및 CSS를 가져오는 함수
const fetchUpdatedContent = async (elementName) => {
  if (!browser) {
    await initializeBrowser();
  }

  try {
    await page.goto(
      "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=blo3&qvt=0&query=%EB%A7%9E%EC%B6%A4%EB%B2%95%ED%80%B4%EC%A6%88", // 원하는 웹 사이트 URL로 변경 필요
      { waitUntil: "networkidle2" }
    );

    await page.evaluate((elementName) => {
      const element = document.querySelector(elementName);
      if (element) {
        element.click(); // 특정 요소 클릭
      }
    }, elementName);

    // 업데이트된 HTML 및 CSS 가져오기
    const updatedHtml = await page.content();
    const updatedCss = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((cssRule) => cssRule.cssText)
              .join("\n");
          } catch (error) {
            return null;
          }
        })
        .filter((css) => css !== null)
        .join("\n");
      return styles;
    });

    return { html: updatedHtml, css: updatedCss };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error occurred while fetching updated content.");
  }
};

// 서버로 export
export { fetchUpdatedContent, closeBrowser };
