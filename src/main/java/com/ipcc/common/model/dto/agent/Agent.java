package com.ipcc.common.model.dto.agent;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
// 상담원 정보를 담는 VO 클래스
public class Agent {

    private String agtNo;         // 상담원 고유값
    private String agtId;         // 상담원 아이디
    private String custId;        // 업체코드
    private String agtPw;         // 상담원 비밀번호
    private String agtExt;        // 상담원 할당 내선번호
    private String agtName;       // 상담원 이름
    private String agtGroup;      // 상담 그룹
    private String agtTeam;       // 상담 팀
    private String agtAuth;          // 상담원 권한 (0: 일반, 1: 관리자)
    private String phonePw;       // IP 전화기 비밀번호
    private String enrollDate; // 상담원 등록일
    private String unrollDate; // 상담원 업데이트일
    private String useAfter;    // 자동후처리 사용여부 (Y: 사용, B: 미사용)
    private String useCallBack; // 콜백 사용여부 (Y: 사용, B: 미사용)
    private String state;         // 상태 (Y: 활동, B: 정지)
}
