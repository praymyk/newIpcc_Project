package com.ipcc.common.controller;

import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.manager.model.dto.manager.Manager;
import com.ipcc.manager.service.AgentService;
import com.ipcc.manager.service.ManagerService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
public class LoginController {

    @Autowired
    private ManagerService managerService;

    // 상담원 인증정보 확인을 위한 service 주입
    private final AgentService agentService;

    public LoginController(AgentService agentService, ManagerService managerService) {
            this.agentService = agentService;
            this.managerService = managerService;
    }

    // manager 로그인 페이지로 리다이렉트
    @PostMapping("/mlogin")
    public String managerLogin(@ModelAttribute Manager manager, HttpSession session) {

        // 1. 관리자 인증 정보 확인
        Manager loginManager = managerService.selectManager(manager);
        // 2. 관리자 인증 정보가 일치하면 manager 메인 페이지로 리다이렉트 + 세션에 관리자 정보 저장
        if(loginManager != null) {
            session.setAttribute("loginManager", loginManager);
            return "redirect:/manager/main";
        }
        // 3. 일치하지 않으면 로그인 페이지로 리다이렉트
        log.info("로그인 실패");

        return "redirect:/manager/login";
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

            // 세션에 상담원 정보 저장
            session.setAttribute("loginAgent", loginAgent);

            // 뷰에 표시할 상담원 정보 저장

            return "redirect:crm/main";
        }
        // 3. 일치하지 않으면 로그인 페이지로 리다이렉트
        log.info("로그인 실패");

        return "redirect:crm/login";
    }

    // 로그인 성공 후 crm 메인 페이지 이동
    @GetMapping("/crm/main")
    public String crmMain(Model model) {

        // 기본 콘텐츠 설정
        String contentView;
        contentView = "crm/crm-counsel/counsel-content";

        model.addAttribute("contentName", contentView);

        return "crm/crm-main";
    }

    @GetMapping("/crm/alogout")
    public String crmLogout(HttpSession session) {
        session.invalidate();
        return "redirect:/crm/login";
    }


}
