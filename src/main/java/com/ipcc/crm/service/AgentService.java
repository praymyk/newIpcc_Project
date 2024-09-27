package com.ipcc.crm.service;

import com.ipcc.common.mapper.AgentMapper;
import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.manager.model.dto.agent.AgentMon;
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

        //agentMapper.updateAgentMon(agentMon); //상담원 상태 모니터링 테이블 업데이트
        //로그인 이벤트 등록 후 종료
        return agentMapper.insertAgentLogInOutEvent(agentEventLog);
    }

    // 상담원 로그아웃 이벤트 등록용 메서드
    @Transactional
    public int insertAgentLogOutEvent(AgentEventLog agentEventLog, AgentMon agentMon) {

        // step. 1 로그아웃 시 이전 상태 종료
        agentMapper.updateAgentEvent(agentEventLog);
        // step. 2 상담원 상태 모니터링 테이블 업데이트
        agentMapper.updateAgentMon(agentMon);
        // step. 3 로그아웃 이벤트 등록
        return agentMapper.insertAgentLogInOutEvent(agentEventLog);
    }

    // 상담원 이벤트 등록용 메서드
    @Transactional
    public int insertAgentEvent(AgentEventLog agentEventLog, AgentMon agentMon) {

        agentMapper.updateAgentMon(agentMon);
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

    // 상담원 리스트 조건 조회용 메소드
    public Object currentAgentEvent(String agentExt) {
        return agentMapper.currentAgentEvent(agentExt);
    }

    @Transactional // 트랜잭션을 적용하여 두 작업을 원자적으로 처리
    public void saveAgentWithId(Agent agent) {
        // 1. 상담원 정보 INSERT
        int result = addAgent(agent);  // 여기서 자동으로 agtNo가 채워짐

        // 2. 상담원 ID 업데이트
        if (result > 0) {
            agent.setAgtId(agent.getCustId() + "_" + String.format("%04d", Integer.parseInt(agent.getAgtNo())));
            updateAgentId(agent);
        }
    }
    // 운영관리 - 상담원 관리 - 상담원 신규 등록
    public int addAgent(Agent agent) {
        return agentMapper.addAgent(agent);
    }
    // 상담원 신규 등록 시 상담원 아이디 등록용 메서드
    public int updateAgentId(Agent agent) {
        return agentMapper.updateAgentId(agent);
    }

    // 운영관리 - 상담원 정보 수정
    @Transactional
    public int updateAgent(Agent agent) {
        return agentMapper.updateAgent(agent);
    }
}

