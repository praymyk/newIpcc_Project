package com.ipcc.crm.controller;

import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.manager.service.AgentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller("crmAgentController")
@RequestMapping("/crm/agent")
public class AgentController {

    @Autowired
    private AgentService agentService;
    
    // 상담원 상태 로그 저장용 메서드
    @PostMapping("/saveAgentStatusLog")
    @ResponseBody
    public String saveAgentStatusLog(AgentEventLog agentEventLog) {
        // 상담원 상태 로그 저장
        log.info("agentEventLog : " + agentEventLog);

        String result = agentService.addAgentEvent(agentEventLog);

        return result;
    }

    // 상담원 이벤트 업데이트 용 메서드
    @PostMapping("/updateAgentStatusLog")
    @ResponseBody
    public int updateAgentStatusLog(AgentEventLog agentEventLog,
                                    @RequestParam("beforeEventId") String eventId,
                                    @RequestParam("useTime") String useTime,
                                    @RequestParam("endTime") String endTime) {
        // step.1 상담원 이벤트 업데이트

        AgentEventLog beforeAgentEventLog = new AgentEventLog();
        beforeAgentEventLog.setEventId(eventId);
        beforeAgentEventLog.setTimeUse(useTime);
        beforeAgentEventLog.setTimeEnd(endTime);

        log.info("beforeAgentEventLog : " + beforeAgentEventLog);
        agentService.updateAgentEvent(beforeAgentEventLog);

        //step2. 새로운 상담원 이벤트 등록

        // 상담원 상태 로그 저장
        log.info("agentEventLog : " + agentEventLog);

        String result = agentService.addAgentEvent(agentEventLog);

        return 0;
    }
}
