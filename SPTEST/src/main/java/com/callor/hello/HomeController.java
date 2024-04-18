package com.callor.hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.callor.hello.service.SpService;

import lombok.extern.slf4j.Slf4j;

/**
 * Handles requests for the application home page.
 */
@Slf4j
@Controller
public class HomeController {

    private final SpService spService;

    @Autowired
    public HomeController(SpService spService) {
        this.spService = spService;
    }

    @RequestMapping(value="/", method=RequestMethod.GET)
    public String showForm() {
        return "form"; // form.html로 이동
    }

    @RequestMapping(value="/", method=RequestMethod.POST)
    public String extractNouns(String text, Model model) {
    	log.debug("한글: {}", text);
    	model.addAttribute("nouns", spService.extractNouns(text));
        return "result";
    }
}