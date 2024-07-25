package com.ipcc.manager.service;

import com.ipcc.manager.model.dao.AgentMapper;
import com.ipcc.manager.model.dto.agent.AgentAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgentService {

    private final AgentMapper agentMapper;

    @Autowired
    public AgentService(AgentMapper agentMapper) {
        this.agentMapper = agentMapper;
    }

    public void getAgentList() {
        // 에이전트 목록 조회
    }

    public void getAgent() {
        // 에이전트 조회
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
