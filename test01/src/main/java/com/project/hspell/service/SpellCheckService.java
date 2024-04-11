package com.project.hspell.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SpellCheckService {
	  private final String NAVER_SPELL_CHECK_API_URL = "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy";

	    private final RestTemplate restTemplate;

	    public SpellCheckService(RestTemplate restTemplate) {
	        this.restTemplate = restTemplate;
	    }

	    public String checkSpelling(String word) {
	        String url = NAVER_SPELL_CHECK_API_URL + "?q=" + word + "&color_blindness=0";
	        String result = restTemplate.getForObject(url, String.class);
	        // 여기서는 결과를 그대로 반환하도록 하지만, 실제로는 JSON 파싱 등의 추가 처리를 할 수 있습니다.
	        return result;
	    }
}
