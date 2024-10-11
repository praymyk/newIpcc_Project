package com.ipcc.crm.controller;

import com.ipcc.common.model.dto.page.PageResponse;
import com.ipcc.crm.model.dto.guest.Guest;
import com.ipcc.crm.service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/crm")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    // 고객리스트 검색 메서드
    @RequestMapping("guest/getGuestList")
    @ResponseBody
    public List<Guest> getGuestInfo(@RequestParam("searchKeyword") String searchKeyword,
                                    @RequestParam String custId,
                                    @RequestParam(required = false, defaultValue = "agtName") String orderBy,
                                    @RequestParam(required = false, defaultValue = "ASC") String orderDirection,
                                    @RequestParam(required = false, defaultValue = "1") int pageNumber,
                                    @RequestParam(required = false, defaultValue = "10") int pageSize) {

        log.info("Guest : " + searchKeyword + "custId : " + custId);

        // 페이지네이션을 위한 offset 계산
        int offset = (pageNumber - 1) * pageSize;
        // 전체 데이터 개수 조회
        int totalItems = guestService.countGuestList(custId, searchKeyword);

        // sql문 미완성

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
        return new PageResponse<>(guestList, totalItems, totalPages, pageNumber, pageSize).getDataList();
    }
}
