package com.ipcc.crm.controller;

import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.crm.service.AgentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller("crmAgentController")
@RequestMapping("/crm/agent")
public class AgentController {

    @Autowired
    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    // 현재 상담원 상태 조회용 메서드
    @PostMapping("/getCurrentStatus")
    @ResponseBody
    public ResponseEntity<?> getAgentStatus(@RequestParam("agentExt") String agentExt){
        // 상담원 상태 조회
        if(agentExt == null || agentExt.equals("")){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(agentService.currentAgentEvent(agentExt));
    }
    
    // 상담원 상태 로그 저장용 메서드
    @PostMapping("/saveAgentStatusLog")
    @ResponseBody
    public String saveAgentStatusLog(AgentEventLog agentEventLog) {

        int result = agentService.addAgentEvent(agentEventLog);

        if(result > 0){
            return "상담원 상태 저장 성공";
        } else {
            return "상담원 상태 저장 실패";
        }
    }


    // 상담원 이벤트 업데이트 용 메서드
    @PostMapping("/updateAgentStatusLog")
    @ResponseBody
    public String updateAgentStatusLog(AgentEventLog agentEventLog) {

        // step.1 이전 상담원 이벤트 종료 상태로 업데이트
        AgentEventLog beforeAgentEventLog = new AgentEventLog();

        int result = agentService.updateAgentEvent(beforeAgentEventLog);

        if (result > 0) {
            //step2. 새로운 상담원 이벤트 등록
            int result2 = agentService.addAgentEvent(agentEventLog);

            if (result2>0) {
                return "상담원 상태 전환 성공";
            } else {
                return "상담원 상태 전환 실패";
            }

        } else {
            return "상담원 상태 전환 실패";
        }
    }

}
