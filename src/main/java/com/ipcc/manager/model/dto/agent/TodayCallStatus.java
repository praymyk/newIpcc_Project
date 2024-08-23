package com.ipcc.manager.model.dto.agent;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TodayCallStatus {

    private String watingCall; // 대기 통화
    private String totalCall; // 전체 통화
    private String responseCall; // 응답 통화
    private String abandonCall; // 포기 통화
    private String outCallTry; // 아웃바운드 시도
    private String outCall; // 아웃바운드
    private String callBack;  // 콜백
}
