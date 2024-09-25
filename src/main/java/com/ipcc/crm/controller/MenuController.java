package com.ipcc.crm.controller;

import com.ipcc.crm.service.AgentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller("crmMenuController")
public class MenuController {

    private final AgentService crmAgentService;

    public MenuController(AgentService crmAgentService) {
        this.crmAgentService = crmAgentService;
    }

    // 메뉴 선택용 메서드 > 선택 메뉴로 리다이렉트
    @GetMapping("crm/loadContent")
    public String selectMenuSwitch(@RequestParam("contentId") String contentId){
        log.info("contentId : " + contentId);
        String contentName;
        // 메뉴 선택
        switch (contentId){
            case "counsel": // 상담 메뉴
                contentName = "crm/crm-counsel/counsel-content :: content";
                break;
            case "callmanagement": // 상담관리 메뉴
                contentName = "crm/crm-callmanagement/callmanagement-content :: content";
                break;
            case "management": // 운영 메뉴
                contentName = "crm/crm-management/management-content :: content";
                break;
            case "statistics": // 통계 메뉴
                contentName = "crm/crm-statistics/statistics-content :: content";
                break;
            default:
                return "crm/crm-counsel/counsel-content :: content";
        }
         return contentName;
    }

    // 메뉴 선택 후 선택 페이지 로드
    @GetMapping("crm/{contentName}")
    public String selectMenu(@PathVariable("contentName") String contentName, Model model){
        String contentView;

        // 메뉴 선택
        switch (contentName){
            case "main":
                contentView = "crm/crm-counsel/counsel-content";
                break;
            case "counsel": // 상담 메뉴
                contentView = "crm/crm-counsel/counsel-content";
                break;
            case "callmanagement": // 상담관리 메뉴
                contentView = "crm/crm-callmanagement/callmanagement-content";
                break;
            case "management": // 운영 메뉴
                contentView = "crm/crm-management/management-content";
                break;
            case "statistics": // 통계 메뉴
                contentView = "crm/crm-statistics/statistics-content";
                break;
            default:
                contentView = "crm/crm-counsel/counsel-content";
                break;
        }
        // contentId에 맞는 데이터를 모델에 추가
        model.addAttribute("contentName", contentView);

        return "crm/crm-main";  // 전체 페이지 템플릿
    }

    // 서브 메뉴 선택용 메서드
    @GetMapping("crm/loadSubContent")
    public String selectSubMenu(@RequestParam("contentId") String contentId){

        String contentName = "";

        log.info("contentId : " + contentId);
        // 서브 메뉴 선택
        switch (contentId){
            case "agent-management": // 상담 메뉴
                contentName = "crm/crm-management/management-agent :: management-agent";
                break;
            case "operating-management": // 상담관리 메뉴
                contentName = "crm/crm-management/management-operating :: management-operating";
                break;
            case "holiday-management": // 운영 메뉴
                contentName = "crm/crm-management/management-holiday :: management-holiday";
                break;
            case "ivr-management": // 통계 메뉴
                contentName = "crm/crm-management/management-ivr :: management-ivr";
                break;

            default:
                return "crm/crm-counsel/counsel-content :: counsel-content";
        }
        return contentName;
    }
}

