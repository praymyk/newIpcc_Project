package com.ipcc.common.controller;

import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.manager.service.AgentService;
import jakarta.servlet.http.HttpSession;
import jdk.jshell.spi.ExecutionControl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
public class LoginController {

        // 상담원 인증정보 확인을 위한 service 주입
        private final AgentService agentService;

        public LoginController(AgentService agentService) {
                this.agentService = agentService;
        }

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
        /*
        * @param agentAuth 상담원 인증 정보
        * @param ccode 회사 코드
        * */
        @PostMapping("/alogin")
        public String crmLogin(@ModelAttribute Agent agent, HttpSession session) {

            // 1. 상담원 인증 정보 확인
            Agent loginAgent = agentService.selectAgent(agent);
            log.info("Agent : " + loginAgent);

            // 2. 상담원 인증 정보와 회사 코드가 일치하면 crm 메인 페이지로 리다이렉트 + 세션에 상담원 정보 저장
            if(loginAgent != null) {
                session.setAttribute("loginAgent", loginAgent);


                // 세션에 상담원 정보 저장
                return "crm/main";
            }
            // 3. 일치하지 않으면 로그인 페이지로 리다이렉트
            log.info("로그인 실패");

            return "redirect:crm/login";
        }

}
