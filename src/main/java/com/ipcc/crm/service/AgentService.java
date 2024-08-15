package com.ipcc.crm.service;

import com.ipcc.common.mapper.AgentMapper;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("crmAgentService")
public class AgentService {

    private final AgentMapper agentMapper;

    @Autowired
    public AgentService(AgentMapper agentMapper) {
        this.agentMapper = agentMapper;
    }

    // 상담원 로그인, 로그아웃 이벤트 등록용 메서드
    public int insertAgentLogInOutEvent(AgentEventLog agentEventLog) {
        return agentMapper.insertAgentLogInOutEvent(agentEventLog);
    }
    
    // 상담원 이벤트 등록용 메서드
    public int insertAgentEvent(AgentEventLog agentEventLog) {
        return agentMapper.insertAgentEvent(agentEventLog);
    }

    // 상담원 상태 로그 업데이트용 메서드
    public int updateAgentEvent(AgentEventLog agentEventLog) {
        return agentMapper.updateAgentEvent(agentEventLog);
    }

    // 현재 상담원 상태 조회용 메서드
    public Object currentAgentEvent(String agentExt) {
        return agentMapper.currentAgentEvent(agentExt);
    }
}
