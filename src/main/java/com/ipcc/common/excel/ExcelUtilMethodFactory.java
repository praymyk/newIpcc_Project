package com.ipcc.common.excel;

import com.ipcc.manager.model.dto.agent.AgentAuth;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.util.List;


/*
    * ExcelUtils 에서 사용할 DB 데이터의 종류를 다룰 용도의 인터페이스
    * 엑셀 다운로드 기능을 적용 DTD 클래스마다 ExceDownload, renderExcelBody 메소드를 등록해주기 위한 인터페이스
    *
    * @method AgentAuthExcelDownload - 상담원 리스트 엑셀 다운로드 기능
    * @method renderAgentAuthExcelBody - 상담원 리스트 엑셀 다운로드 기능의 Body 부분을 그리는 작업
 */
public interface ExcelUtilMethodFactory {

    void AgentAuthExcelDownload(List<AgentAuth> data, HttpServletResponse response);
    void renderAgentAuthExcelBody(List<AgentAuth> data, Sheet sheet, Row row, Cell cell);
}
