package com.callor.hello.service;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CheckService {

    private WebDriver driver;

    public CheckService() {
        // Chrome 드라이버 경로 설정
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\KMS505102\\Documents\\workspace\\SpringMVC\\Combine\\src\\main\\resources\\chromedriver.exe");

        // Chrome 브라우저를 숨기는 옵션 설정
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // 브라우저를 숨김
        options.addArguments("--disable-gpu"); // GPU 사용 안함

        // Chrome 브라우저 열기
        driver = new ChromeDriver(options);

        // 네이버 맞춤법 검사기 페이지로 이동
        driver.get("https://search.naver.com/search.naver?where=nexearch&query=%EB%84%A4%EC%9D%B4%EB%B2%84+%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0&ie=utf8&sm=tab_she&qdt=0");
    }
    public String checkGrammar(String text) {
        try {
            // 문장 입력 필드 찾기
            WebElement inputField = driver.findElement(By.cssSelector("textarea[title='맞춤법 검사를 원하는 단어나 문장을 입력해 주세요.']"));

            // 문장 입력
            inputField.clear(); // 이전 입력 내용 삭제
            inputField.sendKeys(text);

            // 검사 버튼 클릭
            driver.findElement(By.cssSelector("button.btn_check")).click(); // 검사하기 버튼을 누른다.

            // 결과 가져오기 (결과가 로딩될 때까지 충분한 시간을 주는 것이 좋음)
            Thread.sleep(300); // 예시로 0.8초 대기
            WebElement resultElement = driver.findElement(By.cssSelector("p._result_text.stand_txt"));

            // 결과 텍스트 추출
            String result = resultElement.getText();
            log.debug("문장을 가져와라 : {}", result);

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while checking grammar.";
        }
    }

    // 서비스 종료 시 WebDriver 종료
    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }
}
