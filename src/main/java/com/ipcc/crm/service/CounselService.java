package com.ipcc.crm.service;

import com.ipcc.common.mapper.primary.CounselMapper;
import com.ipcc.crm.model.dto.counsel.Category;
import com.ipcc.crm.model.dto.counsel.CounselLog;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class CounselService {

    private final CounselMapper counselMapper;

    public CounselService(CounselMapper CounselMapper) {
        this.counselMapper = CounselMapper;
    }
    
    // 상담이력 작성 폼 내 업체별 카테고리 종류 조회
    public List<Category> getCategoryList(String custId) {

        return counselMapper.getCategoryList(custId);
    }

    //  상담이력 insert/update
    @Transactional
    public String saveCounselLog(CounselLog counselLog) {
        // 1. 상담 이력 기본 정보 insert/update (crm_counsel)
        counselMapper.saveCounselLog(counselLog);
        // 2. 상담 이력 내 업체별 설정 카테고리 값 insert/update (crm_category_log)
        // 2-1 상담 ID 값이 있는 경우 -> 기존 카테고리 값 delete 후 insert
        if(counselLog.getCounselId() != null && counselLog.getCounselId().isEmpty()) {
            counselMapper.deleteCategoryLog(counselLog);
            counselMapper.insertCategoryLog(counselLog);
            return "상담이력 수정 완료";
        } else {
            // 2-2 상담 ID 값이 없는 경우 -> insert
            counselMapper.insertCategoryLog(counselLog);
            return "상담이력 저장 완료";
        }
    }
}
