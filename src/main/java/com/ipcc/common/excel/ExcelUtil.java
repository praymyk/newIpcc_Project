package com.ipcc.common.excel;

import com.ipcc.common.ErrorCode;
import com.ipcc.common.ErrorException;
import com.ipcc.common.annotation.ExcelColumn;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Component
// 엑셀 파일 DB 업로드, DB 데이터 엑셀 다운로드 기능 제공용 유틸리티
public class ExcelUtil {

    /*
    https://blog.naver.com/PostView.naver?blogId=siniphia&logNo=223120720919&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView
    * 엑셀 파일을 읽어서 DB에 저장하는 메서드
    * @param file 업로드할 엑셀 파일
    * @param clazz 엑셀 파일을 파싱하여 저장할 DTO 클래스
     */
    public <T> List<T> uploadExceltoDB(MultipartFile file, Class<T> clazz) throws IOException {

           /* read workbook & sheet */
            Workbook workbook = WorkbookFactory.create(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            /* parse header & body */
            parseHeader(sheet, clazz);
            return parseBody(sheet, clazz);
    }


    // 엑셀 파일 다운로드
    public void downloadExcelfromDB() {
        // 엑셀 파일 다운로드
    }

    /*
    * 업로드 하는 엑셀 파일의 header 와 DTO 클래스의 Excel ExcelColumn 어노테이션 비교
    * 일치하는지 확인용 메서드
    * @param sheet 엑셀 파일의 sheet
    * @param clazz DTO 클래스
    * */
    private <T> void parseHeader(Sheet sheet, Class<T> clazz) {
        Set<String> excelHeaders = new HashSet<>();
        Set<String> classHeaders = new HashSet<>();

        int headerStartRowToParse = 0; // 첫 번째 행이 헤더인 경우
        sheet.getRow(headerStartRowToParse).cellIterator()
                .forEachRemaining(e -> excelHeaders.add(e.getStringCellValue()));

        Arrays.stream(clazz.getDeclaredFields())
                .filter(e -> e.isAnnotationPresent(ExcelColumn.class))
                .forEach(e -> {
                    if (e.getAnnotation(ExcelColumn.class).headerName().equals("")) {
                        classHeaders.add(e.getName());
                    }
                    else {
                        classHeaders.add(e.getAnnotation(ExcelColumn.class).headerName());
                    }
                });

        // 엑셀 파일의 header와 DTO 클래스의 ExcelColumn 어노테이션을 비교하여 일치하는지 확인
        // 일치하지 않으면 에러 발생
        if (!excelHeaders.containsAll(classHeaders)) {
            throw new ErrorException(
                    String.format("Excel file headers are not compatible with given class %s", clazz.getName()),
                    ErrorCode.BAD_REQUEST_ERROR
            );
        }
    }

    /*
    * 엑셀 파일의 body를 파싱하여 DTO 객체로 변환하는 메서드
    * ExcelObject 인터페이스를 구현한 DTO 클래스만 파싱 가능
    * @param sheet 엑셀 파일의 sheet
    * @param clazz DTO 클래스
     */
    private <T> List<T> parseBody(Sheet sheet, Class<T> clazz) {
        List<T> objects = new ArrayList<>();
        clazz.getDeclaredConstructor().setAccessible(true);

        for(int i = 1; i <= sheet.getLastRowNum(); i++) {
            T object = clazz.getDeclaredConstructor().newInstance();
            clazz.getMethod("fillUpFromRow", Row.class).invoke(object, sheet.getRow(i));
            objects.add(object);
        }
        return objects;
    }

    /*
    * 엑셀 다운로드를 위한 메서드
    * @param stream 엑셀 파일을 저장할 스트림
    * @param data 엑셀 파일로 변환할 데이터
    * @param clazz DTO 클래스
    *
    * */
    public <T> void renderObjectToExcel(OutputStream stream, List<T> data, Class<T> clazz) {
        /* create workbook & sheet */
        Workbook workbook = WorkbookFactory.create(true);
        Sheet sheet = workbook.createSheet();

        /* render header & body */
        renderHeader(sheet, clazz);
        renderBody(sheet, data, clazz);

        /* close stream */
        workbook.write(stream);
        workbook.close();
        workbook.close();
    }


    /*
    * 주어진 DTO 클래스 필드의 목록을 엑셀 파일 첫 줄 헤더로 입력하는 메서드
    * @ExcelColumn 어노테이션을 가진 필드만 헤더로 입력
    * @param sheet 엑셀 파일의 sheet
    * @param clazz DTO 클래스
    *    * */
    private <T> void renderHeader(Sheet sheet, Class<T> clazz) {
        Row row = sheet.createRow(headerStartRowToRender);
        int colIdx = startColToRender;

        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(ExcelColumn.class)) {
                String headerName = field.getAnnotation(ExcelColumn.class).headerName();
                row.createCell(colIdx, CellType.STRING).setCellValue(
                        headerName.equals("") ? field.getName() : headerName
                );
                colIdx++;
            }
        }

        if (colIdx == startColToRender) {
            throw new ErrorException(
                    String.format("Class %s has no @ExcelColumn", clazz.getName()),
                    ErrorCode.INTERNAL_SERVER_ERROR
            );
        }
    }

    /*
    *  List<T> data 를 엑셀 파일의 body로 입력하는 메서드
    *  CellType. 을 필드 타입에 따라 변경해야 함.
    * @param sheet 엑셀 파일의 sheet
    * @param data 엑셀 파일로 변환할 데이터
    * @param clazz DTO 클래스
    * */

    private <T> void renderBody(Sheet sheet, List<T> data, Class<T> clazz) {
        int rowIdx = bodyStartRowToRender;

        for (T datum : data) {
            Row row = sheet.createRow(rowIdx);
            int colIdx = startColToRender;
            for (Field field : clazz.getDeclaredFields()) {
                field.setAccessible(true);
                row.createCell(colIdx, CellType.STRING).setCellValue(String.valueOf(field.get(datum)));
                colIdx++;
            }
            rowIdx++;
        }
    }

}
