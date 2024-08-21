package com.ipcc.manager.model.dto.agent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AgentListStatus {
    private int stayAgent;  // 대기 상담사 수
    private int afterAgent; // 후처리 상담사 수
    private int afkAgent;   // 자리비움 상담사 수
    private int etcAgent;   // 기타 상담사 수
    private int inCallAgent; // IN 통화 상담사 수
    private int outCallAgent; // OUT 통화 상담사 수
    private int loginAgent; // 로그인 상담사 수
    private int totalAgent; // 전체 상담사 수
}
