package com.project.hspell.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class GetToken {
	private final RestTemplate restTemplate;
	private String token;

	public GetToken(RestTemplate restTemplate) {
	        this.restTemplate = restTemplate;
	    }

	public String updateToken() {
		try {
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(
					//https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=c01bf8e7961efa1d326d0d7cf4187074705df85b&_callback=jQuery&q={글자}&color_blindness=0
					"https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=맞춤법검사기",
					String.class);
			String html = responseEntity.getBody();
			String newToken = extractTokenFromHtml(html);
			if (newToken != null) {
				this.token = newToken;
				return this.token;
			} else {
				System.err.println("Failed to update token: passportKey not found in HTML");
				return null;
			}
		} catch (Exception e) {
			System.err.println("Error while updating token: " + e.getMessage());
			return null;
		}
	}

	public String getToken() {
		if (this.token == null) {
			return updateToken();
		} else {
			return this.token;
		}
	}

	private String extractTokenFromHtml(String html) {
		// HTML에서 토큰을 추출하는 로직을 구현합니다.
		// 여기서는 간단하게 정규식을 사용하여 추출하는 예시를 보여드립니다.
		String regex = "passportKey=([a-zA-Z0-9]+)";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(html);
		if (matcher.find()) {
			return matcher.group(1);
		} else {
			return null;
		}
	}

}
