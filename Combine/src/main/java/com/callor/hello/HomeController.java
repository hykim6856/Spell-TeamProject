package com.callor.hello;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.callor.hello.service.PopService;
import com.callor.hello.service.SpService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

/**
 * Handles requests for the application home page.
 */
@Slf4j
@Controller
public class HomeController {

	private final SpService spService;
	private final PopService popService;
    private static final String URL = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=네이버맞춤법검사기";
    private static String lastCheckedValue = null;
    private static LocalDateTime lastCheckedTime = null;



	public HomeController(SpService spService, PopService popService ) {
		super();
		this.spService = spService;
		this.popService = popService;

	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String extractNouns(@RequestParam(required = false, defaultValue = "") String text, Model model) {
		
	     log.debug("패스키 실행 테스트");
	        // 현재 시간을 가져옵니다.
	        LocalDateTime now = LocalDateTime.now();
		
	        // 마지막 조회 시간이 8시간 이전인지 확인합니다.
	        if (lastCheckedTime == null || ChronoUnit.HOURS.between(lastCheckedTime, now) >= 8) {
	            RestTemplate restTemplate = new RestTemplate();
	            String response = restTemplate.getForObject(URL, String.class);

	            // "passportKey" 값을 추출합니다.
	            Pattern pattern = Pattern.compile("passportKey=([a-zA-Z0-9]+)");
	            Matcher matcher = pattern.matcher(response);
	            if (matcher.find()) {
	                String todayValue = matcher.group(1);

	                // 마지막으로 조회한 값과 비교합니다.
	                if (!todayValue.equals(lastCheckedValue)) {
	                    // 값이 변경되었을 경우, 업데이트합니다.
	                    lastCheckedValue = todayValue;
	                    lastCheckedTime = now;
	                    log.debug("새로운 값: {}", todayValue);
	                    return todayValue;
	                } else {
	                    // 값이 변경되지 않았을 경우, 메시지를 출력합니다.
	                    log.debug("변경된 값이 없습니다.");
	                    return lastCheckedValue;
	                }
	            } else {
	                log.error("데이터를 조회하는 중 오류가 발생했습니다.");
	                return null;
	            }
	        } else {
	            // 8시간이 지나지 않았을 경우, 마지막 조회 값을 반환합니다.
	            log.debug("마지막 조회 값: {}", lastCheckedValue);
	       
	        }
		
	
		
		log.debug("한글: {}", text);
		model.addAttribute("nouns", spService.extractNouns(text));
		model.addAttribute("texts", text);
		model.addAttribute("PASSPORT", lastCheckedValue);
		return "form";
	}

	@RequestMapping(value = "/words", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showWords(String word) throws IOException {
		List<String> words = popService.scrapeWords(word);

		// ObjectMapper를 사용하여 리스트를 JSON 형식의 문자열로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonWords = null;
		try {
			jsonWords = objectMapper.writeValueAsString(words);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return jsonWords;
	}}
	