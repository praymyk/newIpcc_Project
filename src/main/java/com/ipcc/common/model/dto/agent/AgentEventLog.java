package com.ipcc.common.model.dto.agent;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class AgentEventLog {

    private String eventId; // 이벤트 ID
    private String custId; // 업체 ID
    private String agentExt; // 상담원 내선번호
    private String agentName;   // 상담원 이름
    private String cid; // 통화 대상 번호
    private String did; // 상담원 사용 번호
    private String divInOut;  // 통화 in/out 구분
    private String eventName;   // 이벤트 이름
    private String timeStart;   // 이벤트 발생 시간
    private String timeUse;   // 이벤트 사용 시간
    private String timeEnd; // 이벤트 종료 시간
    private String ipAddress;   // 이벤트 발생 IP
}
