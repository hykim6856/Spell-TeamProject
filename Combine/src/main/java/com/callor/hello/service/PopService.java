package com.callor.hello.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PopService {
//
//    public List<String> scrapeWords(String word) {
//        // 선택한 단어를 이용하여 기본 URL에 추가
//        String baseUrl = "https://ko.wiktionary.org/wiki/";
//        String url = baseUrl + word;
//
//        log.debug("URL: {}", url);
//        List<String> words = new ArrayList<>();
//
//        try {
//            // Jsoup을 사용하여 HTML 문서를 가져옵니다.
//            Document doc = Jsoup.connect(url).get();
//
//            // li 태그들을 모두 찾습니다.
//            Elements liTags = doc.select("li");
//
//            for (Element li : liTags) {
//                String text = li.text();
//                if (text.contains("유의어") || text.contains("합성어") || text.contains("파생어")) {
//                    // 콜론(:)을 기준으로 분할한 후, 1번 인덱스의 값을 선택합니다.
//                    String[] parts = text.split(":");
//                    if (parts.length > 1) {
//                        String[] synonyms = parts[1].trim().split(", ");
//                        for (String synonym : synonyms) {
//                            words.add(synonym);
//                        }
//                    }
//                }
//            }
//
//            log.debug("리스트: {}", words);
//        } catch (IOException e) {
//            // HTML 문서를 가져오는 도중 예외가 발생한 경우
//            log.error("HTML 문서를 가져오는 도중 오류 발생: {}", e.getMessage());
//            // 예외를 더 상위로 던질 수도 있고, 다른 처리를 할 수도 있습니다.
//        }
//
//        return words;
//    }
	
	
	 public List<String> scrapeWords(String word) {
	        String baseUrl = "https://ko.wiktionary.org/wiki/";
	        String url = baseUrl + word;

	        log.debug("URL: {}", url);
	        List<String> words = new ArrayList<>();


	        try {
	            Document doc = Jsoup.connect(url).get();

	            // 각 섹션을 식별하고 해당 섹션의 예시들을 가져오기
	            String[] sections = {"합성어", "유의어", "파생어","반의어"};
	            for (String section : sections) {
	                Element sectionElement = doc.selectFirst("span#" + section);

	                if (sectionElement != null) {
	                    Elements exampleElements = sectionElement.parent().nextElementSibling().select("ul li");

	                    for (Element exampleElement : exampleElements) {
	                        String[] exampleWords = exampleElement.text().split(", ");
	                        for (String exampleWord : exampleWords) {
	                            words.add(exampleWord);
	                        }
	                    }
	                }
	            }

	            // li 태그들을 모두 찾습니다.
	            Elements liTags = doc.select("li");

	            for (Element li : liTags) {
	                String text = li.text();
	                if (text.contains("유의어") || text.contains("합성어") || text.contains("파생어") || text.contains("반의어")) {
	                    // 콜론(:)을 기준으로 분할한 후, 1번 인덱스의 값을 선택합니다.
	                    String[] parts = text.split(":");
	                    if (parts.length > 1) {
	                        String[] synonyms = parts[1].trim().split(", ");
	                        for (String synonym : synonyms) {
	                            words.add(synonym);
	                        }
	                    }
	                }
	            }

	            log.debug("리스트: {}", words);
	        } catch (IOException e) {
	            log.error("HTML 문서를 가져오는 도중 오류 발생: {}", e.getMessage());
	        }

	        return words;
	    }
}