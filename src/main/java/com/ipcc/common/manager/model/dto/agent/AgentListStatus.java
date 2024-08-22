package com.ipcc.common.manager.model.dto.agent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AgentListStatus {
    private int readyAgents;  // 대기 상담사 수
    private int afterAgents; // 후처리 상담사 수
    private int restAgents;   // 자리비움 상담사 수
    private int etcAgent;   // 기타 상담사 수
    private int inCallAgents; // IN 통화 상담사 수
    private int outCallAgents; // OUT 통화 상담사 수
    private int loginAgents; // 로그인 상담사 수
    private int totalAgents; // 전체 상담사 수
}
