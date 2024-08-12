package com.ipcc.manager.controller;

import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
import com.ipcc.manager.service.AgentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

// 상담원 관리 컨트롤러
@Slf4j
@Controller
@RequestMapping("/manager/agent")
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    // 상담원 목록 조회
    @GetMapping("/agentList")
    public void getAgentList(Agent agent)  {
        log.info("agent : " + agent);
    }

    // 상담원 등록
    @PostMapping("/save")
    public String addAgent() {
        try {
            // 상담원 등록 로직
            AgentAuth agentAuth = new AgentAuth("auth1001", "userpass", "1001password", "1001");

            int result = agentService.addAgent(agentAuth);

            // 리다이렉트 로직
            return "redirect:/manager/agent";
        } catch (Exception e) {
            log.error("Error occurred while adding agent", e);
            return "error"; // 에러 페이지로 리다이렉트하거나 적절한 뷰 반환
        }
    }

    // 상담원 수정
    public void modifyAgent() {
        // 상담원 수정 로직
    }

    // 상담원 삭제
    public void deleteAgent() {
        // 상담원 삭제 로직
    }
}
