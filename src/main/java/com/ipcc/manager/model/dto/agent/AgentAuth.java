package com.ipcc.manager.model.dto.agent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
// 상담원 인증 정보를 담는 VO 클래스
public class AgentAuth {
    private String agentId;
    private String authType;
    private String agentPw;
    private String agentName;
}
