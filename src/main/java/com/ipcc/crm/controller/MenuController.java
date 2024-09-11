package com.ipcc.crm.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller("crmMenuController")
public class MenuController {

    // 메뉴 선택용 메서드
    @GetMapping("crm/loadContent")
    public String selectMenu(@RequestParam("contentId") String contentId){

        String contentName = "";

        log.info("contentId : " + contentId);
        // 메뉴 선택
        switch (contentId){
            case "counsel": // 상담 메뉴
                contentName = "crm/crm-counsel/counsel-content :: counsel-content";
                break;
            case "callmanagement": // 상담관리 메뉴
                contentName = "crm/crm-callmanagement/callmanagement-content :: callmanagement-content";
                break;
            case "management": // 운영 메뉴
                contentName = "crm/crm-management/management-content :: management-content";
                break;
            case "statistics": // 통계 메뉴
                contentName = "crm/crm-statistics/statistics-content :: statistics-content";
                break;
            default:
                return "crm/crm-counsel/counsel-content :: counsel-content";
        }
        return contentName;
    }

    // 서브 메뉴 선택용 메서드
    @GetMapping("crm/loadSubContent")
    public String selectSubMenu(@RequestParam("contentId") String contentId){

        String contentName = "";

        log.info("contentId : " + contentId);
        // 서브 메뉴 선택
        switch (contentId){
            case "agent-management": // 상담 메뉴
                contentName = "crm/crm-management/management-agent";
                break;
            default:
                return "crm/crm-counsel/counsel-content :: counsel-content";
        }
        return contentName;
    }
}

