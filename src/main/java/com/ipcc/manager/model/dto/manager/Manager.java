package com.ipcc.manager.model.dto.manager;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Manager {
    private int managerNo;  // 관리자 번호
    private String ccode;  // 고객사 코드
    private String mngId;  // 관리자 아이디
    private String mngPw;  // 관리자 비밀번호
    private String managerName;  // 관리자 이름
    private String managerEmail;  // 관리자 이메일
    private String managerPhone;  // 관리자 전화번호
    private String enrollDay; // 등록시간
    private String unenrollDay;   // 해제시간
    private String Status;  // 상태
}
