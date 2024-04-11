package com.project.hspell;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {


	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	

	
	@RequestMapping(value = "/spellcheck", method = RequestMethod.GET)
	public String checkSpell() {
		
	    return "spellCheck";
	}
	
	@RequestMapping(value = "/spellcheck", method = RequestMethod.POST)
	public String checkSpell(@RequestParam("text") String text, Model model) {
        // 맞춤법 검사를 위한 URL
        String spellCheckUrl = "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=3bdb8b5033cd0aa81f05834a6a32cab78663c7dc&q=" + text + "&color_blindness=0";

        // RestTemplate을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(spellCheckUrl, String.class);
        
        // JSON 결과에서 교정된 값 추출
        String correctedText = parseCorrectedText(result);

        // 모델에 결과 추가
        model.addAttribute("inputText", text);
        model.addAttribute("correctedText", correctedText);
	    return "spellCheck";
	}
	 private String parseCorrectedText(String jsonResult) {
		 String correctedText = "";

		    try {
		        // JSON 문자열을 JSONObject로 변환
		        JSONObject jsonObject = new JSONObject(jsonResult);

		        // 교정된 텍스트를 추출
		        JSONObject result = jsonObject.getJSONObject("message").getJSONObject("result");
		        correctedText = result.getString("html");
		    } catch (Exception e) {
		        e.printStackTrace();
		    }
	        return correctedText;
	    }
	
	

	
}
