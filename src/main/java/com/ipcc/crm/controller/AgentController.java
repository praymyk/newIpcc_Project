package com.ipcc.crm.controller;

import com.ipcc.common.model.dto.agent.Agent;
import com.ipcc.common.model.dto.agent.AgentEventLog;
import com.ipcc.common.model.dto.page.PageResponse;
import com.ipcc.manager.model.dto.agent.AgentMon;
import com.ipcc.crm.service.AgentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller("crmAgentController")
@RequestMapping("/crm")
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    // 현재 상담원 상태 조회용 메서드
    @PostMapping("agent/getCurrentStatus")
    @ResponseBody
    public ResponseEntity<?> getAgentStatus(@RequestParam("agentExt") String agentExt) {
        // 상담원 상태 조회
        if(agentExt == null || agentExt.equals("")){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(agentService.currentAgentEvent(agentExt));
    }

    // 상담원 이벤트 업데이트 용 메서드
    @PostMapping("agent/updateAgentStatusLog")
    @ResponseBody
    public String updateAgentStatusLog(AgentEventLog agentEventLog) {

        // agentMon 정보 갱신에 필요한 정보 vo 클래스에 담기
        AgentMon agentMon = new AgentMon();

        agentMon.setDivLogin("on");
        agentMon.setCustId(agentEventLog.getCustId());
        agentMon.setAgentExt(agentEventLog.getAgentExt());
        agentMon.setAgentName(agentEventLog.getAgentName());
        agentMon.setDivStat(agentEventLog.getEventName());
        agentMon.setCid(agentEventLog.getCid());
        agentMon.setDid(agentEventLog.getCid());
        agentMon.setDivInOut(agentEventLog.getDivInOut());

        int result = agentService.updateAgentEvent(agentEventLog, agentMon);

        return (result > 0) ? "상담원 상태 업데이트 성공" : "상담원 상태 업데이트 실패";
    }

    // 상담원 로그인 상태 업데이트 용 메소드
    @PostMapping("agent/updateAgentLoginStatus")
    @ResponseBody
    public String updateAgentLoginStatus(AgentEventLog agentEventLog, @RequestParam("currentStatus") String currentStatus) {
        log.info("currentStatus: {}", currentStatus);
        log.info("log in agentEventLog: {}", agentEventLog);

        // agentMon에 로그인 상태 갱신에 필요한 정보 vo 클래스에 담기
        AgentMon agentMon = new AgentMon();

        agentMon.setDivLogin("on");
        agentMon.setCustId(agentEventLog.getCustId());
        agentMon.setAgentExt(agentEventLog.getAgentExt());
        agentMon.setAgentName(agentEventLog.getAgentName());
        
        // step.1 로그인 시는 이전 상태를 종료 시키지 않음
        // step.2 로그인 이벤트 등록 ( 로그인 로그 + 로그인 상태 전환 )
        int result = agentService.insertAgentLogInEvent(agentEventLog);

        if (result>0) {
            // step.3 로그인 전 상태(currentStatus) 값이 존재않는 다면 "준비" 상태 등록
            if(currentStatus == null || currentStatus.equals("")){
                agentEventLog.setEventName("Preparing");
                agentMon.setDivStat("Preparing");
                agentService.insertAgentEvent(agentEventLog, agentMon);
            }
            return "상담원 로그인 상태 업데이트 성공";
        } else {
            return "상담원 로그인 상태 업데이트 실패";
        }
    }

    // 상담원 로그아웃 상태 업데이트 용 메소드
    @PostMapping("agent/updateAgentLogoutStatus")
    @ResponseBody
    public String updateAgentLogOutStatus(AgentEventLog agentEventLog) {

        // agentMon에 로그아웃 상태 갱신에 필요한 정보 vo 클래스에 담기
        AgentMon agentMon = new AgentMon();

        agentMon.setDivLogin("off");
        agentMon.setCustId(agentEventLog.getCustId());
        agentMon.setAgentExt(agentEventLog.getAgentExt());
        agentMon.setAgentName(agentEventLog.getAgentName());
        agentMon.setDivStat(agentEventLog.getEventName());

        int result = agentService.insertAgentLogOutEvent(agentEventLog, agentMon);
        return (result > 0) ? "상담원 상태종료 업데이트 성공" : "상담원 상태 종료 업데이트 실패";
    }

    // 운영관리 - 상담원 관리 - 상담원 리스트 조회용 메소드
    @GetMapping("/management/agentList")
    @ResponseBody
    public PageResponse<Agent> getAgentList(
            @RequestParam String custId,
            @RequestParam(required = false) String searchKeyword,
            @RequestParam(required = false, defaultValue = "agtName") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderDirection,
            @RequestParam(required = false, defaultValue = "1") int pageNumber,
            @RequestParam(required = false, defaultValue = "10") int pageSize) {

        // 페이지네이션을 위한 offset 계산
        int offset = (pageNumber - 1) * pageSize;
        // 전체 데이터 개수 조회
        int totalItems = agentService.countAgentList(custId, searchKeyword);
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalItems / pageSize);

        // 서비스 호출 (검색어, 정렬 조건, 페이징 처리)
        List<Agent> agentList = agentService.selectAgentList(
                custId,
                searchKeyword,
                orderBy,
                orderDirection,
                offset,
                pageSize);

        // 페이지 응답 객체 생성
        return new PageResponse<>(agentList, totalItems, totalPages, pageNumber, pageSize);
    }

    // 운영관리 - 상담원 관리 - 상담원 상세 정보 저장용 메소드
    @PostMapping("management/addAgentInfo")
    @ResponseBody
    public String saveAgentInfo(@RequestBody Agent agent) {
        // 1 . input checkbox 값 테이블 컬럼에 맞게 변환
        // 관리자 권한 0: 일반, 1: 관리자
        agent.setAgtAuth("true".equals(agent.getAgtAuth()) ? "1" : "0");
        // 콜백 사용 여부 Y: 사용, N: 미사용
        agent.setUseCallBack("true".equals(agent.getUseCallBack()) ? "Y" : "N");
        // 자동 후처리 사용 여부 Y: 사용, N: 미사용
        agent.setUseAfter("true".equals(agent.getUseAfter()) ? "Y" : "N");

        try {
            agentService.saveAgentWithId(agent);
            return "상담원 상세 정보 저장 성공";
        } catch (Exception e) {
            log.error("상담원 저장 실패", e);
            return "상담원 상세 정보 저장 실패";
        }
    }

    // 운영관리 - 상담원 관리 - 상담원 상세 정보 수정용 메소드
    @PostMapping("management/updateAgentInfo")
    @ResponseBody
    public String updateAgentInfo(@RequestBody Agent agent){

        // 1 . input checkbox 값 테이블 컬럼에 맞게 변환
        // 관리자 권한 0: 일반, 1: 관리자
        agent.setAgtAuth("true".equals(agent.getAgtAuth()) ? "1" : "0");
        // 콜백 사용 여부 Y: 사용, N: 미사용
        agent.setUseCallBack("true".equals(agent.getUseCallBack()) ? "Y" : "N");
        // 자동 후처리 사용 여부 Y: 사용, N: 미사용
        agent.setUseAfter("true".equals(agent.getUseAfter()) ? "Y" : "N");

        // 2. 내선 번호 입력 검사
        // 2-1. 입력된 내선 번호가 존재할 경우
        if(agent.getAgtExt() != null && agent.getAgtExt().matches("^[0-9]*$")){
            // 동일 내선번호가 존재할 경우 에러 메시지 리턴
            if(agentService.checkAgentExt(agent) > 0){
                return "동일 내선번호가 존재합니다.";
            }
            // 2-2. 동일 내선번호가 존재하지 않을 경우 내선번호 등록(ps_endpoints, ps_aors, ps_auths 테이블에도 내선번호 등록)
            return (agentService.insertAgentExt(agent) >= 1) ? "상담원 상세 정보 수정 성공" : "상담원 상세 정보 수정 실패";
        }
        // 3. 입력 내선 번호가 없거나 유효한 형식이 아니 경우 내선번호 등록 없이 상담원 정보만 업데이트
        return ( agentService.updateAgent(agent) >0 ) ? "상담원 정보가 업데이트 됐습니다. 내선번호를 등록해 주세요." : "상담원 상세 정보 수정 실패";
    }

    // 운영관리 - 상담원 관리 - 상담원 정지 상태 업데이트용 메소드
    @PostMapping("management/toggleAgentState")
    @ResponseBody
    public String toggleAgentState(@ModelAttribute Agent agent){

        log.info("agent: {}", agent);
        int result = agentService.toggleAgentState(agent);

        return (result > 0) ? "상담원 상태 업데이트 성공" : "상담원 상태 업데이트 실패";

    }

    // 운영관리 - 상담원 관리 - 상담원 리스트에서 부가기능 제어용 메소드
    @PostMapping("management/updateAgentList")
    @ResponseBody
    public String updateAgentList(
            @RequestParam List<String> agtNos,
            @RequestParam String field,
            @RequestParam String value) {
        log.info("agentId: {}, field: {}, value: {}", agtNos, field, value);
        String dbField = field.equals("useCallBack") ? "USE_CALLBACK" : "USE_AFTER";

        int result = agentService.updateAgentList(agtNos, dbField, value);

        return (result > 0 ) ? "상담원 리스트 업데이트 성공" : "상담원 리스트 업데이트 실패";
    }
}