package com.ipcc.manager.service;

import com.ipcc.common.mapper.primary.ManagerMapper;
import com.ipcc.manager.model.dto.manager.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {

    private final ManagerMapper managerMapper;

    @Autowired
    public ManagerService(ManagerMapper managerMapper) {
        this.managerMapper = managerMapper;
    }

    // 관리자 조회
    public Manager selectManager(Manager manager) {
        return managerMapper.selectManager(manager);
    }
}
