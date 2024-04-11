package com.project.hspell;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.hspell.service.SpellCheckService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private final SpellCheckService spellCheckService;
	public HomeController(SpellCheckService spellCheckService) {
		this.spellCheckService = spellCheckService;
	}

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
	public String checkSpell(@RequestParam(required = false) String word, Model model) {
		 String result = "";
		    if (word != null && !word.isEmpty()) {
		        result = spellCheckService.checkSpelling(word);
		    }
	    model.addAttribute("word", word); // 입력한 단어를 모델에 추가
	    model.addAttribute("result", result); // 결과를 모델에 추가
	    return "spellCheck";
	}
	
	
	

	
}
