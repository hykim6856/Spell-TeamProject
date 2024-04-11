package com.project.hspell;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Controller
public class SpellCheckController {

    @GetMapping("/spellcheck")
    public String showSpellCheckForm() {
        return "spellcheck-form";
    }

    @PostMapping("/spellcheck")
    public String spellCheck(@RequestParam("text") String text, Model model) {
        // 맞춤법 검사를 위한 URL
        String spellCheckUrl = "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=3bdb8b5033cd0aa81f05834a6a32cab78663c7dc&q=" + text + "&color_blindness=0";
        //https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=c01bf8e7961efa1d326d0d7cf4187074705df85b&_callback=jQuery&q={여기부분}&color_blindness=0
        // RestTemplate을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(spellCheckUrl, String.class);

        // JSON 결과에서 교정된 값 추출
        String correctedText = parseCorrectedText(result);

        // 모델에 결과 추가
        model.addAttribute("inputText", text);
        model.addAttribute("correctedText", correctedText);

        // 결과를 표시할 JSP 페이지 반환
        return "spellcheck-result";
    }

    private String parseCorrectedText(String jsonResult) {
        // 여기서 JSON 파싱하여 교정된 텍스트 추출하는 로직 구현
        // JSON 파싱은 여러 방법으로 가능 (예: Jackson, Gson, org.json 등)
        // 이 예제에서는 단순 문자열 조작으로 가정합니다.
        // 실제 프로젝트에서는 더 안정적인 방법을 사용해야 합니다.
        // 아래는 단순 예시로 JSON 파싱을 생략한 부분입니다.
        return correctedText;
    }
}
