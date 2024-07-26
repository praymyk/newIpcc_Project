package com.ipcc.common.model.dto;

import org.apache.poi.ss.usermodel.Row;

// 엑셀 파일 데이터 업로드 시 엑셀 파일의 행 내 데이터 타입을 DTO 클래스에서 관리하도록 넘기기위한 인터페이스
public interface ExcelObject {
    void fillUpFromRow(Row row);
}
