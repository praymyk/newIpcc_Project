package com.ipcc.crm.service;

import com.ipcc.common.mapper.primary.AgentMapper;
import com.ipcc.common.mapper.secondary.SecondaryAgentMapper;
import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.manager.model.dto.agent.AgentMon;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service("crmAgentService")
public class AgentService {

    private final AgentMapper agentMapper;
    private final SecondaryAgentMapper secondaryAgentMapper;
    private final RestTemplate restTemplate;

    @Autowired
    public AgentService(AgentMapper agentMapper,
                        SecondaryAgentMapper secondaryAgentMapper,
                        RestTemplate restTemplate) {
        this.agentMapper = agentMapper;
        this.secondaryAgentMapper = secondaryAgentMapper;
        this.restTemplate = restTemplate;
    }

    // application.properties에서 설정 값 주입
    @Value("${meta.api.url}")
    private String metaApiUrl;

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


    // 운영관리 - 상담원 리스트 조회 (검색 + 정렬 + 페이징)
    public List<Agent> selectAgentList(String custId,
                                               String searchKeyword,
                                               String orderBy,
                                               String orderDirection,
                                               int offset,
                                               int pageSize) {
        return agentMapper.selectAgentList(custId, searchKeyword, orderBy, orderDirection, offset, pageSize);
    }
    public int countAgentList(String custId, String searchKeyword) {
        return agentMapper.countAgentList(custId, searchKeyword);
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

    // 운영관리 - 상담원 상태 토글 기능 (정지/재개)
    @Transactional
    public int toggleAgentState(Agent agent) {
        return agentMapper.toggleAgentState(agent);
    }

    // 운영관리 - 상담원 리스트 부가 기능 조정
    public int updateAgentList(List<String> agtNos, String field, String value) {
        return agentMapper.updateAgentList(agtNos, field, value);
    }

    // 운영관리 - 상담원 정보 업데이트 시 내선 번호 중복 확인
    public int checkAgentExt(Agent agent) {
        return agentMapper.checkAgentExt(agent);
    }

    // 운영관리 - 상담원 정보 업데이트 시 내선 번호 등록 (ps_endpoints, ps_aors, ps_auths 테이블에도 내선 번호 등록 필요)
    @Transactional
    public int insertAgentExt(Agent agent) {
        log.info("API 테스트: : " + createAccount(agent));

        try {
//            return secondaryAgentMapper.insertEndpoint(agent.getAgtExt())
//                    + secondaryAgentMapper.insertAors(agent.getAgtExt())
//                    + secondaryAgentMapper.insertAuths(agent.getAgtExt())
//                    + agentMapper.updateAgent(agent);

            return  agentMapper.updateAgent(agent);

        } catch (Exception e) {
            // 예외가 발생했을 때 로그를 남기고 트랜잭션을 롤백합니다.
            System.err.println("Transaction failed: " + e.getMessage());
            e.printStackTrace();

            // 트랜잭션 롤백을 위해 명시적으로 RuntimeException을 던집니다.
            throw new RuntimeException("Transaction rolled back due to an error", e);
        }
    }

    /**
     * API로 계정 생성 요청을 보내는 메소드
     */
    public String createAccount(Agent agent) {
        // 요청 URL
        String url = metaApiUrl;

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);  // JSON 형식의 데이터 전송

        // 요청 바디에 전송할 파라미터 설정
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("username", agent.getAgtExt());
        requestBody.put("password", agent.getAgtPw());
        requestBody.put("role", "role");  // 예: "admin" 또는 "user"
        requestBody.put("smsEnabled", true);
        requestBody.put("chatEnabled", true);
        requestBody.put("messengerEnabled", true);
        requestBody.put("emailEnabled", true);

        // 요청 생성
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // API 호출 및 응답 받기
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        // 응답 결과 반환
        if (response.getStatusCode().is2xxSuccessful()) {
            return "계정 생성 성공: " + response.getBody();
        } else {
            return "계정 생성 실패: " + response.getStatusCode();
        }
    }

}


