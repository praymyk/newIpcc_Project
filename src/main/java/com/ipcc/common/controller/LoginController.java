package com.ipcc.common.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@Controller
public class LoginController {

        // manager 로그인 페이지로 리다이렉트
        @PostMapping("/mlogin")
        public String managerLogin() {
                return "redirect:/manager/main";
        }
        // 로그인 성공 후 manager 메인 페이지 이동
        @GetMapping("/manager/main")
        public String managerMain() {
                return "manager/main";
        }


        // crm 로그인 페이지로 리다이렉트
        @PostMapping("/alogin")
        public String crmLogin() {
                return "redirect:/crm/main";
        }
        // crm 로그인 성공 후 메인 페이지 이동
        @GetMapping("/crm/main")
        public String crmMain() {
                return "crm/test3";
        }
}
