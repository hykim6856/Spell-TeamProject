package com.project.hspell.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.hspell.service.SpellCheckService;


@Controller
public class SpellCheckController {
	
	  private final SpellCheckService spellCheckService;
	  public SpellCheckController(SpellCheckService spellCheckService) {
		  this.spellCheckService = spellCheckService;
		  
	}

	  
	  
	@RequestMapping(value = "/spellcheck", method = RequestMethod.GET)
	public String checkSpell(@RequestParam String word) {
		
		   return spellCheckService.checkSpelling(word);
	}
	
}
