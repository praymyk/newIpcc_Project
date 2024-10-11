package com.ipcc.common.mapper.primary;

import com.ipcc.manager.model.dto.manager.Manager;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ManagerMapper {
    // 관리자 조회
    Manager selectManager(Manager manager);
}
