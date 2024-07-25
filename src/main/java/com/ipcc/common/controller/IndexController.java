package com.ipcc.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    // index 페이지 제어용 Controller ( 운영자 / CRM 선택 )
    
    // 관리자
    @GetMapping("/manager")
    public String managerLogin() {
        return "redirect:/manager/login";
    }
    @GetMapping("/manager/login")
    public String showManagerLoginPage() {
        return "manager/login";
    }

    // 상담원
    @GetMapping("/crm")
    public String crmLogin() {
        return "redirect:/crm/login";
    }
    @GetMapping("/crm/login")
    public String showCrmLoginPage() {
        return "crm/login";
    }

}
