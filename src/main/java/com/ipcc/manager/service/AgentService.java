package com.ipcc.manager.service;

import com.ipcc.common.mapper.AgentMapper;
import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    private final AgentMapper agentMapper;

    @Autowired
    public AgentService(AgentMapper agentMapper) {
        this.agentMapper = agentMapper;
    }

    // 상담원 목록 조회
    public List<AgentAuth> selectAgentList() {
        return agentMapper.selectAgentList();
    }

    // 상담원 조건 조회
    public Agent selectAgent(Agent agent) {
        return agentMapper.selectAgent(agent);
    }

    // 상담원 등록
    public int addAgent(AgentAuth agentAuth) {
        return agentMapper.insertAgent(agentAuth);
    }

    // 상담원 이벤트 등록
    public String addAgentEvent(AgentEventLog agentEventLog) {
        int result = agentMapper.insertAgentEvent(agentEventLog);

        if (result > 0 ){
            return agentEventLog.getEventId();
        }
        return "이벤트 로그 저장 실패";
    }

    // 상담원 상태 로그 업데이트 용
    public void updateAgentEvent(AgentEventLog agentEventLog) {
        int result = agentMapper.updateAgentEvent(agentEventLog);
    }
}
