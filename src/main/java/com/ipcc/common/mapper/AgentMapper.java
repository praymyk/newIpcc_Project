package com.ipcc.common.mapper;

import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentAuth;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.common.model.dto.page.PageResponse;
import com.ipcc.manager.model.dto.agent.AgentListStatus;
import com.ipcc.manager.model.dto.agent.AgentMon;
import com.ipcc.manager.model.dto.agent.TodayCallStatus;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface AgentMapper {
    // 상담원 목록 조회 검색 + 정렬 + 페이징
    List<Agent> selectAgentList(String custId,
                                        String searchKeyword,
                                        String orderBy,
                                        String orderDirection,
                                        int offset,
                                        int pageSize);

    // 상담원 리스트 페이징 처리를 위한 카운팅
    int countAgentList(String custId, String searchKeyword);

    // 상담원 등록
    int addAgent(Agent agent);
    // 신규 상담원 ID 등록
    int updateAgentId(Agent agent);

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

    // 상담원 현황 상태 통계 (모니터링)
    AgentListStatus selectAgentListStatus(String ccode);

    // 금일 통화량 통계 (모니터링)
    TodayCallStatus selectTodayCallStatus(String ccode);

    // 상담원 정보 업데이트
    int updateAgent(Agent agent);

    // 상담원 상태 토글(정지/재개)
    int toggleAgentState(Agent agent);

    // 상담원 리스트 부가기능 조정
    int updateAgentList(List<String> agtNos, String field, String value);
}
