package com.ipcc.manager.model.dao;

import com.ipcc.manager.model.dto.agent.Agent;
import com.ipcc.manager.model.dto.agent.AgentAuth;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AgentMapper {
    List<Agent> getAllAgents();

    int insertAgent(AgentAuth agentAuth);
}
