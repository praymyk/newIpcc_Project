package com.ipcc.manager.controller;

import com.ipcc.manager.model.dto.agent.AgentListStatus;
import com.ipcc.manager.model.dto.agent.TodayCallStatus;
import com.ipcc.manager.service.AgentService;
import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
import com.ipcc.manager.model.dto.agent.AgentMon;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 상담원 관리 컨트롤러
@Slf4j
@Controller("managerAgentController")
@RequestMapping("/manager/agent")
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    // 상담원 상태 조회 (모니터링)
    @GetMapping("/agentStatus")
    @ResponseBody
    public List<AgentMon> getAgentStatus(Agent agent) {
        log.info("잘들어옴?");
        List<AgentMon> agentStatus = agentService.selectAgentStatus(agent);

        return agentStatus;
    }

    // 상담원 리스트의 통계 정보 (모니터링)
    @GetMapping("/agentListStatus")
    @ResponseBody
    public AgentListStatus getAgentListStatus(@RequestParam("ccode") String ccode) {

        // 상담원 현황 조회
        return agentService.selectAgentListStatus(ccode);
    }
    // 금일 통화 상태 통계 정보 (모니터링)
    @GetMapping("/todayCallStatus")
    @ResponseBody
    public TodayCallStatus getTodayCallStatus(@RequestParam("ccode") String ccode) {
        // 상담원 현황 조회
        return agentService.selectTodayCallStatus(ccode);
    }


    // 상담원 등록
    @PostMapping("/save")
    public String addAgent() {
        try {
            // 상담원 등록 로직


            // int result = agentService.addAgent(agent);

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
