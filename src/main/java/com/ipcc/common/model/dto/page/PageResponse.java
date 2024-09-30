package com.ipcc.common.model.dto.page;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PageResponse<T> {
    private List<T> dataList;    // 데이터를 담을 리스트 (제네릭 타입)
    private Long nextCursor;     // 다음 커서 값
    private boolean hasNext;     // 다음 페이지가 있는지 여부
    private int currentPage;     // 현재 페이지 번호
    private int pageSize;        // 한 페이지당 항목 수
}