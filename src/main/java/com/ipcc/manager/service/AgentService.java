package com.ipcc.manager.service;

import com.ipcc.common.mapper.AgentMapper;
import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
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

    /**
     * 상담원 전체 조회
     * @return List<Agent>
     */
    public List<AgentAuth> selectAgentList() {
        // 에이전트 목록 조회
        return agentMapper.selectAgentList();
    }

    public Agent selectAgent(Agent agent) {
        // 에이전트 조회
        return agentMapper.selectAgent(agent);
    }

    public int addAgent(AgentAuth agentAuth) {
        // 에이전트 등록
        return agentMapper.insertAgent(agentAuth);
    }

    public void modifyAgent() {
        // 에이전트 수정
    }

    public void deleteAgent() {
        // 에이전트 삭제
    }

}
