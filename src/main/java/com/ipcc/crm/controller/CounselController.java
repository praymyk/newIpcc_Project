package com.ipcc.crm.controller;

import com.ipcc.crm.model.dto.counsel.Category;
import com.ipcc.crm.model.dto.counsel.CounselLog;
import com.ipcc.crm.service.CounselService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/crm")
public class CounselController {

    private final CounselService counselService;

    public CounselController(CounselService counselService) {
        this.counselService = counselService;
    }

    // 상담 이력 작성 폼 조회
    @RequestMapping("counsel/getConsultForm")
    @ResponseBody
    public List<Category> getConsultForm(@RequestParam String custId) {

        // 업체 코드별 상담이력 작성 폼 조회 > 카테고리 종류 조회
        List<Category> categoryList = counselService.getCategoryList(custId);

        return categoryList;
    }
    // 상담 이력 내 다음 단계 카테고리 조회
    @RequestMapping("counsel/getNextCategory")
    @ResponseBody
    public List<Category> getNextCategory(@RequestParam String categoryType,
                                          @RequestParam int categoryGroup,
                                          @RequestParam String selectedId) {

        // 다음 카테고리 조회 ( 카테고리 타입 + '-' + 카테고리 그룹 + 1 ) => ex) ARS-1
        categoryType = categoryType + "-" + (categoryGroup+1);

        List<Category> categoryList = counselService.getNextCategory(categoryType, selectedId);
        return categoryList;
    }

    // 상담 이력 저장 (등록)
    @RequestMapping("counsel/saveCounselLog")
    @ResponseBody
    public String saveCounselLog(@RequestBody CounselLog counselLog) {
        // 1. 상담 이력 기본 정보 insert/update (crm_counsel)
        // 2. 상담 이력 내 업체별 설정 카테고리 값 insert/update (crm_category_log)
        String result = counselService.saveCounselLog(counselLog);

        return result;
    }

    // 상담이력 조회 (상세)
    @RequestMapping("counsel/getCounselLog")
    @ResponseBody
    public CounselLog getCounselLog(@RequestParam String counselId) {
        log.info("counselId: {}", counselId);

        // 상담이력 상세 조회
        CounselLog counselLog = counselService.getCounselLog(counselId);

        log.info("counselLog: {}", counselLog);

        return counselLog;
    }

}
