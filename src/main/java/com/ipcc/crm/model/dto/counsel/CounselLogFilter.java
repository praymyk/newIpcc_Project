package com.ipcc.crm.model.dto.counsel;

import lombok.Data;

@Data
public class CounselLogFilter {
    private String custId;         // 업체코드
    private String guestId;        // 고객코드
    private String agentId;        // 상담원코드
    private String startDate;      // 조회 시작일
    private String endDate;        // 조회 종료일
    private String processStat;  // 처리상태
    private String category;       // 카테고리(선택값)
    private String searchKeyword;  // 검색어
}
