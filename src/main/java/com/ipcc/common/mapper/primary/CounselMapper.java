package com.ipcc.common.mapper.primary;

import com.ipcc.crm.model.dto.counsel.Category;
import com.ipcc.crm.model.dto.counsel.CounselLog;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CounselMapper {

    // 상담이력 작성 폼 조회 시 업체별 카테고리 종류 조회
    List<Category> getCategoryList(String custId);

    // 상담이력 작성 폼 내 다음 단계 카테고리 조회
    List<Category> getNextCategory(String categoryType, String selectedId);

    // 상담이력 insert/update
    void saveCounselLog(CounselLog counselLog);

    // 상담 이력 내 업체별 설정 카테고리 선택 값  insert
    void insertCategoryLog(CounselLog counselLog);

    // 상담 이력 내 업체별 설정 카테고리 선택 값 Delete
    void deleteCategoryLog(CounselLog counselLog);

    // 상담 이력 조회 (상세)
    CounselLog getCounselLog(String counselId);
}
