package com.project.hspell.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SpellCheckService2 {
	//https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=c01bf8e7961efa1d326d0d7cf4187074705df85b&q={글자}&color_blindness=0
	//https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=c01bf8e7961efa1d326d0d7cf4187074705df85b&_callback=jQuery&q={글자}&color_blindness=0
	  private final String NAVER_SPELL_CHECK_API_URL = "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=95a99f5509c89fb471fd3a5ad4c3477f8240dc11";

	    private final RestTemplate restTemplate;

	    public SpellCheckService2(RestTemplate restTemplate) {
	        this.restTemplate = restTemplate;
	    }

	    public String checkSpelling(String word) {
	        String url = NAVER_SPELL_CHECK_API_URL + "&q=" + word + "&color_blindness=0";
	        String result = restTemplate.getForObject(url, String.class);
	        return result;
	    }
	    
	    public String getResponseFromAPI(String word) {
	        String url = NAVER_SPELL_CHECK_API_URL + "&q=" + word + "&color_blindness=0";
	        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
	        return responseEntity.getBody();
	    }
}

