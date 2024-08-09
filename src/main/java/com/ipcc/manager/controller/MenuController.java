package com.ipcc.manager.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.formula.atp.Switch;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.filter.RequestContextFilter;

import javax.print.attribute.standard.PresentationDirection;
import java.util.HashMap;
import java.util.Map;

@Slf4j
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

    // 상담원 정보
    @RequestMapping("/goAgent")
    public String goAgent() {
        // 메뉴 선택
        return "redirect:/manager/agent";
    }
    @RequestMapping("/manager/agent")
    public String selectAgentController() {
        // 메뉴 선택
        return "manager/manager-detailbar-02";
    }

    // 메뉴 선택용 메서드
    @GetMapping("manager/loadContent")
    public String selectMenu(@RequestParam("contentId") String contentId){

        String contentName = "";

        log.info("contentId : " + contentId);
        // 메뉴 선택
        switch (contentId){
            case "main":
                contentName = "manager/manager-detailbar-01";
                break;
            case "monAgent":
                contentName = "manager/manager-content-03 :: manager-content-03";
                break;
            default:
                return "manager/manager-detailbar-01";
        }

        return contentName;
    }
}
