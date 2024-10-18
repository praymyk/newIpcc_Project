package com.ipcc.crm.model.dto.counsel;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
// 상담 이력 저장 시 데이터를 담을 객체
public class CounselLog {

    private String counselId; // 상담 ID
    private String custId; // 업체 코드
    private String guestId; // 고객 식별 ID
    private String agentId; // 상담원 ID
    private String callId; // 콜 ID
    private String counselDate; // 상담 날짜
    private String timeUsed; // 상담 시간
    private String counselInOut; // 인/아웃 구분
    private String counselMemo; // 상담 내용
    private String[] categoriesArr; // 카테고리 저장 값 (카테고리 ID) 배열
    private String categories; // 콜백 예정일
    private String processStat; // 처리 상태
}
