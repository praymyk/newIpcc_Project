package com.ipcc.crm.service;

import com.ipcc.common.mapper.AgentMapper;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.common.model.dto.agent.AgentMon;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("crmAgentService")
public class AgentService {

    private final AgentMapper agentMapper;

    @Autowired
    public AgentService(AgentMapper agentMapper) {
        this.agentMapper = agentMapper;
    }

    // 상담원 로그인 이벤트 등록용 메서드
    @Transactional
    public int insertAgentLogInEvent(AgentEventLog agentEventLog) {

        // step. 1 로그인 이벤트 등록 후 종료
        return agentMapper.insertAgentLogInOutEvent(agentEventLog);
    }


    // 상담원 로그아웃 이벤트 등록용 메서드
    @Transactional
    public int insertAgentLogOutEvent(AgentEventLog agentEventLog) {
        
        // step. 1 로그아웃 시 이전 상태 종료
        agentMapper.updateAgentEvent(agentEventLog);

        // step. 2 로그아웃 이벤트 등록
        return agentMapper.insertAgentLogInOutEvent(agentEventLog);
    }
    
    // 상담원 이벤트 등록용 메서드
    public int insertAgentEvent(AgentEventLog agentEventLog) {

        return agentMapper.insertAgentEvent(agentEventLog);
    }

    // 상담원 상태 로그 업데이트용 메서드
    @Transactional
    public int updateAgentEvent(AgentEventLog agentEventLog, AgentMon agentMon) {

        // step 1. 이전 상담원 이벤트 종료 상태로 업데이트
        agentMapper.updateAgentEvent(agentEventLog);

        // step 2. 새로운 상담원 이벤트 등록
        agentMapper.insertAgentEvent(agentEventLog);

        // step 3. 상담원 상태 모니터링 테이블 업데이트
        return agentMapper.updateAgentMon(agentMon);
    }

    // 현재 상담원 상태 조회용 메서드
    public Object currentAgentEvent(String agentExt) {
        return agentMapper.currentAgentEvent(agentExt);
    }


}
