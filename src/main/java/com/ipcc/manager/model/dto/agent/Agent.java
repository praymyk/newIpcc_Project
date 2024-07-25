package com.ipcc.manager.model.dto.agent;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
// 상담원 정보를 담는 VO 클래스
public class Agent {
    private String agentId;
    private String transport; // 네트워크 프로토콜과 바인딩 주소를 지정(UDP, TCP, TLS)
    private String aors;
    private String auth;
    private String context; // 엔드포인트가 접속했을 때 사용할 다이얼플랜 컨텍스트를 지정
    private String allow;   // sip 엔드포인트 사용 코덱
    private String direct_media;
    private String agentName;
    private String agentPw;
}
