package com.project.hspell.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.hspell.model.ResultVO;

@Service
public class SpellCheckService {
	//https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=c01bf8e7961efa1d326d0d7cf4187074705df85b&q={글자}&color_blindness=0
	//https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=c01bf8e7961efa1d326d0d7cf4187074705df85b&_callback=jQuery&q={글자}&color_blindness=0
	  private final String NAVER_SPELL_CHECK_API_URL = "https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?passportKey=95a99f5509c89fb471fd3a5ad4c3477f8240dc11";

	    private final RestTemplate restTemplate;
	    private final ObjectMapper objectMapper;

	    public SpellCheckService(RestTemplate restTemplate, ObjectMapper objectMapper) {
	        this.restTemplate = restTemplate;
	        this.objectMapper = objectMapper;
	    }
	    
	    
	    

	    public String checkSpelling(String word) {
	        String url = NAVER_SPELL_CHECK_API_URL + "&q=" + word + "&color_blindness=0";
	        String result = restTemplate.getForObject(url, String.class);
	        return result;
	    }
	    
	    public ResultVO checkSpell(String word) {
	        String url = NAVER_SPELL_CHECK_API_URL + "&q=" + word + "&color_blindness=0";
	        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
	        String responseBody = responseEntity.getBody();

	        try {
	            JsonNode rootNode = objectMapper.readTree(responseBody);
	            JsonNode resultNode = rootNode.path("message").path("result");
	            ResultVO resultVO = objectMapper.treeToValue(resultNode, ResultVO.class);
	            return resultVO;
	        } catch (Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	    }
	    
	    
	    public String getResponseFromAPI(String word) {
	        String url = NAVER_SPELL_CHECK_API_URL + "&q=" + word + "&color_blindness=0";
	        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
	        return responseEntity.getBody();
	    }
}

