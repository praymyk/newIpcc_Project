package com.ipcc.crm.model.dto.counsel;

import lombok.*;

@Data
public class Category {

    private int categoryId; // 카테고리 ID
    private String custId; // 업체 코드
    private String categoryType; // 카테고리 유형 (ARS / COUNSLE)
    private String categoryName; // 카테고리 이름
    private String categoryValue; // 카테고리 값
    private String state;
}