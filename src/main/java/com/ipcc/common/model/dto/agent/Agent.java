package com.ipcc.common.model.dto.agent;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
// 상담원 정보를 담는 VO 클래스
public class Agent {

    private String agentId; // 상담원 ID(내선번호)
    private String agentName;   // 상담원 이름
    private String agentPw;     // 상담원 비밀번호
    private String ccode;    // 회사 코드
}
