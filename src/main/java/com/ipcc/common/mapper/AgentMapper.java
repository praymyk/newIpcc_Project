package com.ipcc.common.mapper;

import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AgentMapper {
    // 상담원 목록 조회
    List<AgentAuth> selectAgentList();

    // 상담원 등록
    int insertAgent(AgentAuth agentAuth);

    // 상담원 조회
    Agent selectAgent(Agent agent);

    // 상담원 상태 이벤트 등록
    int insertAgentEvent(AgentEventLog agentEventLog);

    // 상담원 상태 이벤트 업데이트
    int updateAgentEvent(AgentEventLog agentEventLog);
}
