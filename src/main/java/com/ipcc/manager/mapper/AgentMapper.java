package com.ipcc.manager.mapper;

import com.ipcc.manager.model.Entity.agent.Agent;
import com.ipcc.manager.model.Entity.agent.AgentAuth;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AgentMapper {
    // 상담원 목록 조회
    List<AgentAuth> selectAgentList();

    // 상담원 조회
    int insertAgent(AgentAuth agentAuth);

}
