package com.ipcc.crm.model.dto.counsel;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
// 상담 이력 저장/조회 시 데이터를 담을 객체
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
    private String[] categoriesArr; // 카테고리 저장 값 (카테고리 ID) 배열형태로 받아옴
    private String categories; // 카테고리 조회 값 (카테고리 ID) 문자열로 받아옴
    private String processStat; // 처리 상태

    private String agentName;
    private String guestName;

    // 카테고리 문자열을 JSON 형식으로 변환
    public String getCategoriesAsJson() throws Exception {
        if (categories == null || categories.isEmpty()) {
            return "{}";  // null 또는 빈 문자열일 경우 빈 JSON 반환
        }

        // 카테고리 문자열을 쉼표(,)로 분리
        String[] categoryPairs = categories.split(", ");
        Map<String, String> categoryMap = new HashMap<>();

        // 각 카테고리 key=value 쌍을 처리
        for (String pair : categoryPairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                categoryMap.put(keyValue[0], keyValue[1]);  // key와 value를 Map에 저장
            }
        }

        // Map을 JSON으로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(categoryMap);
    }
}
