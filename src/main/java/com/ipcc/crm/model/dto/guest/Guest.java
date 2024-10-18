package com.ipcc.crm.model.dto.guest;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Guest {
    private String guestId; // 고객 ID 식별 값
    private String custId;  // 업체코드, 업체 식별 번호
    private String agentId; // 담당 상담원 (고객 등록록 상담원 ID)
    private String name;
    private String birthDay;
    private String gender;
    private String grade;
    private String email;
    private String roadAddress;
    private String detailAddress;
    private String phone;
    private String enrollDate;
    private String unrollDate;
    private String guestMemo;
    private String black;
    private String state;

    // 조인 테이블 컬럼 값
    private String guestType; // 고객 등급
    private String guestLastCallDate; // 최근 통화일
}
