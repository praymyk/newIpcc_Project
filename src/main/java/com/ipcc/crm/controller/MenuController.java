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
            case "counsel":
                contentName = "crm/crm-counsel/crm-counsel-content :: crm-counsel-content";
                break;
            case "callmanagement":
                contentName = "crm/crm-callmanagement/cmg-callmanagement-content :: cmg-callmanagement-content";
                break;
            case "statistics":
                contentName = "crm/crm-statistics/crm-statistics-content :: crm-statistics-content";
                break;
            default:
                return "crm/crm-counsel/crm-counsel-content :: crm-counsel-content";
        }
        return contentName;
    }
}
