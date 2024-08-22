package com.ipcc.common.mapper;

import com.ipcc.common.manager.model.dto.manager.Manager;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ManagerMapper {
    // 관리자 조회
    Manager selectManager(Manager manager);
}
