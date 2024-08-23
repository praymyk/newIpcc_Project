package com.ipcc.manager.service;

import com.ipcc.manager.model.dto.agent.AgentListStatus;
import com.ipcc.common.mapper.AgentMapper;
import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
import com.ipcc.manager.model.dto.agent.AgentMon;
import com.ipcc.manager.model.dto.agent.TodayCallStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("managerAgentService")
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

    // 상담원 상태 조회 (모니터링)
    public List<AgentMon> selectAgentStatus(Agent agent) {
        return agentMapper.selectAgentStatus(agent);
    }

    // 상담원 조건 조회
    public Agent selectAgent(Agent agent) {
        return agentMapper.selectAgent(agent);
    }

    // 상담원 등록
    public int addAgent(AgentAuth agentAuth) {
        return agentMapper.insertAgent(agentAuth);
    }

    // 상담원 현황 통계 (모니터링) 조회
    public AgentListStatus selectAgentListStatus(String ccode) {
        return agentMapper.selectAgentListStatus(ccode);
    }

    // 금일 통화량 현황 통계 (모니터링) 조회
    public TodayCallStatus selectTodayCallStatus(String ccode) {
        return agentMapper.selectTodayCallStatus(ccode);
    }
}
