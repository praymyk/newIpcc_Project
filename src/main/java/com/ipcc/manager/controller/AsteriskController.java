package com.ipcc.manager.controller;

import com.ipcc.common.service.AsteriskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class AsteriskController {

    @Autowired
    private AsteriskService asteriskService;

    @GetMapping("/test")
    public String index(Model model) {
        log.info ("들어옴?");
        String endpoints = asteriskService.getEndpoints();
        model.addAttribute("endpoints", endpoints);
        return "manager/manager-monitor";
    }
}