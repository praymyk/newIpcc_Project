package com.ipcc.manager.model.Entity.agent;

import com.ipcc.common.annotation.ExcelColumn;
import com.ipcc.common.model.dto.ExcelObject;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.poi.ss.usermodel.Row;

@AllArgsConstructor
@Getter
@Setter
@ToString
// 상담원 인증 정보를 담는 VO 클래스
public class AgentAuth implements ExcelObject {
    @ExcelColumn(headerName = "상담원 ID")
    private String agentId;
    @ExcelColumn(headerName = "비밀번호 타입")
    private String authType;
    @ExcelColumn(headerName = "비밀번호")
    private String agentPw;
    @ExcelColumn(headerName = "이름")
    private String agentName;

    // 엑셀 파일의 한 행을 읽어서 DTO 객체에 넣어주는 메소드 ( 데이터 타입 변환 목적 )
    @Override
    public void fillUpFromRow(Row row) {
        //this.agentId = (int) row.getCell(0).getNumericCellValue();
        this.agentId = row.getCell(0).getStringCellValue();
        this.authType = row.getCell(1).getStringCellValue();
        this.agentPw = row.getCell(2).getStringCellValue();
        this.agentName = row.getCell(3).getStringCellValue();
    }
}
