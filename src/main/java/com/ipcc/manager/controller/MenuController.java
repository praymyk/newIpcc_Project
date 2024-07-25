package com.ipcc.manager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.filter.RequestContextFilter;

@Controller
public class MenuController {
    private final RequestContextFilter requestContextFilter;

    public MenuController(RequestContextFilter requestContextFilter) {
        this.requestContextFilter = requestContextFilter;
    }

    public void getMenuList() {
        // 메뉴 목록 조회
    }

    public void getMenu() {
        // 메뉴 조회
    }

    public void addMenu() {
        // 메뉴 등록
    }

    public void modifyMenu() {
        // 메뉴 수정
    }

    public void deleteMenu() {
        // 메뉴 삭제
    }

    @RequestMapping("/goAgent")
    public String selectMenu() {
        // 메뉴 선택
        return "redirect:/manager/agent";
    }

    @RequestMapping("/manager/agent")
    public String selectAgentController() {
        // 메뉴 선택
        return "manager/manager-detailbar-02";
    }
}
