package com.ipcc.crm.controller;

import com.ipcc.common.model.dto.page.PageResponse;
import com.ipcc.crm.model.dto.counsel.CounselLog;
import com.ipcc.crm.model.dto.counsel.CounselLogFilter;
import com.ipcc.crm.model.dto.guest.Guest;
import com.ipcc.crm.service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/crm")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    // 상담 페이지 내 고객 정보 전환 기능 ( 고객정보 / 고객 상담이력/ 메모 / 콜백 / 상담문자)
    @GetMapping("crm-counsel/cust-info-{category}")
    public String getCustInfoFragment(@PathVariable("category") String category) {
        switch (category) {
            case "custInfo":
                return "crm/crm-counsel/cust-info-custInfo :: custInfo-custInfo";
            case "counselLog":
                return "crm/crm-counsel/cust-info-counselLog :: custInfo-counselLog";
            case "custMemo":
                return "crm/crm-counsel/cust-info-custMemo :: custInfo-custMemo";
            case "callback":
                return "crm/crm-counsel/cust-info-callback :: custInfo-callback";
            case "counselSMS":
                return "crm/crm-counsel/cust-info-counselSMS :: custInfo-counselSMS";
            default:
                return "error/404";
        }
    }

    // 고객리스트 검색 메서드
    @RequestMapping("guest/getGuestList")
    @ResponseBody
    public PageResponse<Guest> getGuestInfo(@RequestParam("searchKeyword") String searchKeyword,
                                    @RequestParam String custId,
                                    @RequestParam(required = false, defaultValue = "agtName") String orderBy,
                                    @RequestParam(required = false, defaultValue = "ASC") String orderDirection,
                                    @RequestParam(required = false, defaultValue = "1") int pageNumber,
                                    @RequestParam(required = false, defaultValue = "5") int pageSize) {

        // 페이지네이션을 위한 offset 계산
        int offset = (pageNumber - 1) * pageSize;
        // 전체 데이터 개수 조회
        int totalItems = guestService.countGuestList(custId, searchKeyword);

        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalItems / pageSize);

        // 서비스 호출 (검색어, 정렬 조건, 페이징 처리)
        List<Guest> guestList = guestService.selectGuestList(
                custId,
                searchKeyword,
                orderBy,
                orderDirection,
                offset,
                pageSize);
        // sql문 미완성

        // 페이지 응답 객체 생성
        return new PageResponse<>(guestList, totalItems, totalPages, pageNumber, pageSize);
    }

    // 선택 고객 정보 조회
    @RequestMapping("guest/selectGuestInfo")
    @ResponseBody
    public Guest selectGuestInfo(@RequestParam("guestId") String guestId) {
        return guestService.selectGuestInfo(guestId);
    }

    // 고객정보 저장
    @RequestMapping("guest/saveGuestInfo")
    @ResponseBody
    public String saveGuestInfo(@RequestBody Guest guest) {

        // step 1. guestId가 new 일 경우 신규 고객 정보 저장
        if( "new".equals(guest.getGuestId()) ) {
            guest.setGuestId(null);
        }

        // step 2. 연락처 중복 검사 (guestId, phone 정보를 넘기고 다른 guestID가 같은 phone 정보가 있는지 확인)
        int emailCheck = guestService.checkPhoneDuplicate(guest.getGuestId(), guest.getPhone());

        if( emailCheck > 0 ) {
            return "이미 등록된 전화번호 입니다.";
        } else { // step 3. 연락처 중복이 없을 경우 저장
            return (guestService.saveGuestInfo(guest)>0) ? "고객 정보 저장 성공" : "고객 정보 저장 실패";
        }
    }

    // 선택 고객의 상담이력 리스트 조회
    @RequestMapping("guest/getCounselLogList")
    @ResponseBody
    public PageResponse<CounselLog> getCounselLogList(CounselLogFilter filter,
                                              @RequestParam(required = false, defaultValue = "CALL_DATE") String orderBy,
                                              @RequestParam(required = false, defaultValue = "DESC") String orderDirection,
                                              @RequestParam(required = false, defaultValue = "1") int pageNumber,
                                              @RequestParam(required = false, defaultValue = "5") int pageSize) {

        log.info("filter: {}", filter);
        log.info("orderBy: {}", orderBy);
        log.info("orderDirection: {}", orderDirection);
        // 페이지네이션을 위한 offset 계산
        int offset = (pageNumber - 1) * pageSize;
        // 전체 데이터 개수 조회
        int totalItems = guestService.countCounselLogList(filter);
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalItems / pageSize);

        // 페이징 처리된 선택 고객의 상담 리스트 조회
        List<CounselLog> counselLogList = guestService.getCounselLogList(
                filter,
                orderBy,
                orderDirection,
                offset,
                pageSize);

        // 페이지 응답 객체 생성
        return new PageResponse<>(counselLogList, totalItems, totalPages, pageNumber, pageSize);
    }

}
