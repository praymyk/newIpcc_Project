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

    // 상담원 이벤트 업데이트 용 메서드
    @PostMapping("/updateAgentStatusLog")
    @ResponseBody
    public String updateAgentStatusLog(AgentEventLog agentEventLog) {

        // step.1 이전 상담원 이벤트 종료 상태로 업데이트
        int result = agentService.updateAgentEvent(agentEventLog);

        if (result > 0) {
            //step2. 새로운 상담원 이벤트 등록
            int result2 = agentService.insertAgentEvent(agentEventLog);

            return (result2 > 0) ? "상담원 상태 업데이트 성공" : "상담원 상태 업데이트 실패";

        } else {
            return "상담원 상태 전환 실패";
        }
    }

    // 상담원 로그인 상태 업데이트 용 메소드
    @PostMapping("/updateAgentLoginStatus")
    @ResponseBody
    public String updateAgentLoginStatus(AgentEventLog agentEventLog, @RequestParam("currentStatus") String currentStatus) {
        log.info("currentStatus: {}", currentStatus);

        // step.1 로그인 시는 이전 상태를 종료 시키지 않음
        // step.2 로그인 이벤트 등록
        int result = agentService.insertAgentLogInOutEvent(agentEventLog);

        if (result>0) {
            // step.3 로그인 전 상태(currentStatus) 값이 존재않는 다면 "준비" 상태 등록
            if(currentStatus == null || currentStatus.equals("")){
                agentEventLog.setEventName("preparing");
                agentService.insertAgentEvent(agentEventLog);
            }
            return "상담원 로그인 상태 업데이트 성공";
        } else {
            return "상담원 로그인 상태 업데이트 실패";
        }
    }

    // 상담원 로그아웃 상태 업데이트 용 메소드
    @PostMapping("/updateAgentLogoutStatus")
    @ResponseBody
    public String updateAgentLogOutStatus(AgentEventLog agentEventLog) {

        // step.1 로그아웃 시 이전 상태를 종료
        int result = agentService.updateAgentEvent(agentEventLog);

        if( result > 0){
            // step.2 로그아웃 이벤트 등록
            int result2 = agentService.insertAgentLogInOutEvent(agentEventLog);

            return (result2 > 0) ? "상담원 로그아웃 상태 업데이트 성공" : "상담원 로그아웃 상태 업데이트 실패";

        } else {
            return "상담원 로그아웃 상태 업데이트 실패";
        }

    }

}