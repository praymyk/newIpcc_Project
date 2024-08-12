package com.ipcc.manager.service;

import com.ipcc.manager.model.dto.manager.Manager;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {
    // 관리자 조회
    public Manager selectManager(Manager manager) {
        // 관리자 조회

            Manager m = new Manager(1, "test", "test", "test", "test", "test", "test", "test", "test", "test", "test");

        return m;
    }
}
