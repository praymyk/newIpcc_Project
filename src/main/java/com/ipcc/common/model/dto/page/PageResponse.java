package com.ipcc.common.model.dto.page;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PageResponse<A> {
    private List<A> dataList;    // 데이터를 담을 리스트 (제네릭 타입)
    private int totalItems;      // 총 아이템 수
    private int totalPages;      // 총 페이지 수
    private int currentPage;     // 현재 페이지
    private int pageSize;        // 페이지당 아이템 수
}