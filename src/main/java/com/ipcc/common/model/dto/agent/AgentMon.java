package com.ipcc.common.model.dto.agent;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AgentMon {

    private String custId;      // 소속 업체 ID
    private String agentExt;    // 상담사 내선번호
    private String trunk;       // 트렁크
    private String cid;         // 통화 대상 번호
    private String agentName;   // 상담사 이름
    private String divInOut;    // 통화 in/out 구분
    private String divStat;     // 상담사 상태
    private String timeStart;   // 통화 시작 시간
    private String divLogin;    // 로그인/로그아웃 구분
    private String stackLogin;  // 로그인 스택
    private String stackOut;    // 통화 out 스택
    private String stackIn;     // 통화 in 스택
    private String sipUrl;      // SIP URL
    private String resetTime;   // 리셋 시간
}
