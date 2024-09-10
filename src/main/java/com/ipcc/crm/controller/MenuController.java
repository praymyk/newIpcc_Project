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
                contentName = "crm/crm-counsel/crm-counsel-content :: crm-counsel-content";
                break;
            case "callmanagement": // 상담관리 메뉴
                contentName = "crm/crm-callmanagement/cmg-callmanagement-content :: cmg-callmanagement-content";
                break;
            case "management": // 운영 메뉴
                contentName = "crm/crm-management/crm-management-content :: crm-management-content";
                break;
            case "statistics": // 통계 메뉴
                contentName = "crm/crm-statistics/crm-statistics-content :: crm-statistics-content";
                break;
            default:
                return "crm/crm-counsel/crm-counsel-content :: crm-counsel-content";
        }
        return contentName;
    }
}
