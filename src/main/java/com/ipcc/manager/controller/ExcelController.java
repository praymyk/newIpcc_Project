package com.ipcc.manager.controller;

import com.ipcc.common.annotation.ExcelColumn;
import com.ipcc.common.excel.ExcelUtils;
import com.ipcc.manager.model.dto.agent.AgentAuth;
import com.ipcc.manager.service.AgentService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

@Slf4j
@Controller
public class ExcelController {

    private final AgentService agentService;
    private final ExcelUtils excelUtils;
    public ExcelController(AgentService agentService, ExcelUtils excelUtils) {
        this.agentService = agentService;
        this.excelUtils = excelUtils;
    }



    @GetMapping("/agentList/ExcelDownload2")
    public void downloadAgentInfo(HttpServletResponse response) throws IOException {

        // 엑셀 파일 하나를 만듭니다
        Workbook workbook = new SXSSFWorkbook();

        // 엑셀 파일 내부에 Sheet 를 하나 생성합니다 (엑셀 파일 하나에는 여러 Sheet가 있을 수 있습니다)
        Sheet sheet = workbook.createSheet("상담원 목록");

        // 엑셀 렌더링에 필요한 DTO를 가져옵니다
        List<AgentAuth> agentagentList = agentService.selectAgentList();

        // 헤더를 생성합니다
        int rowIndex = 0;
        Row headerRow = sheet.createRow(rowIndex++);

        // DTO 클레스에 커스텀 어노테이션을 부여한 필드를 찾아 엑셀 헤더로 만들기
        /*
        * DTO 클래스 부분을 변수로 받아서 사용할 예정!!!!!!!!!!!!!!!!!!!
        * */
        Field[] fields = AgentAuth.class.getDeclaredFields();
        int cellIndex = 0;

        for (Field field : fields) {
            if (field.isAnnotationPresent(ExcelColumn.class)) {
                ExcelColumn column = field.getAnnotation(ExcelColumn.class);
                Cell headerCell = headerRow.createCell(cellIndex++);
                headerCell.setCellValue(column.headerName());
            }
        }

        // 바디에 데이터를 넣어줍니다
        for (AgentAuth dto : agentagentList) {
            Row bodyRow = sheet.createRow(rowIndex++);

            Cell bodyCell1 = bodyRow.createCell(0);
            bodyCell1.setCellValue(dto.getAgentId());

            Cell bodyCell2 = bodyRow.createCell(1);
            bodyCell2.setCellValue(dto.getAuthType());

            Cell bodyCell3 = bodyRow.createCell(2);
            bodyCell3.setCellValue(dto.getAgentPw());

            Cell bodyCell4 = bodyRow.createCell(3);
            bodyCell4.setCellValue(dto.getAgentName());
        }

        // HTTP 응답 헤더 설정
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=agentList.xlsx");

        // 엑셀 파일을 응답에 씁니다
        workbook.write(response.getOutputStream());
        workbook.close();
    }


    @GetMapping("/agentList/ExcelDownload")
    public void downloadAgentInfo2(HttpServletResponse response){

        excelUtils.AgentAuthExcelDownload(agentService.selectAgentList(), response);


    }
}
