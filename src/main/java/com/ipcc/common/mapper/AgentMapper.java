package com.ipcc.common.mapper;

import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.common.manager.model.dto.agent.AgentListStatus;
import com.ipcc.common.manager.model.dto.agent.AgentMon;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface AgentMapper {
    // 상담원 목록 조회
    List<AgentAuth> selectAgentList();

    // 상담원 등록
    int insertAgent(AgentAuth agentAuth);

    // 상담원 조회
    Agent selectAgent(Agent agent);

    // 상담원 현재 상태 조회
    AgentEventLog currentAgentEvent(@Param("agentExt") String agentExt);
    
    // 상담원 로그인/로그아웃 이벤트 등록
    int insertAgentLogInOutEvent(AgentEventLog agentEventLog);

    // 상담원 상태 이벤트 등록
    int insertAgentEvent(AgentEventLog agentEventLog);

    // 상담원 상태 이벤트 업데이트
    int updateAgentEvent(AgentEventLog agentEventLog);

    // 상담원 상태 모니터링 테이블 업데이트
    int updateAgentMon(AgentMon agentEventLog);

    // 상담원 상태 조회 (모니터링)
    List<AgentMon> selectAgentStatus(Agent agent);

    // 상담원 현황 상태 정보 (모니터링)
    AgentListStatus selectAgentListStatus(String ccode);
}
