package com.ipcc.crm.service;

import com.ipcc.common.mapper.primary.GuestMapper;
import com.ipcc.crm.model.dto.guest.Guest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {

    private final GuestMapper guestMapper;

    public GuestService(GuestMapper guestMapper) {
        this.guestMapper = guestMapper;
    }

    // 고객리스트 검색 메서드 (총 숫자 파악)
    public int countGuestList(String custId, String searchKeyword) {
        return guestMapper.countGuestList(custId, searchKeyword);
    }
    // 고객 리스트 검색 메서드 (페이징 처리 된 리스트 조회)
    public List<Guest> selectGuestList(String custId, String searchKeyword, String orderBy, String orderDirection, int offset, int pageSize) {
        return guestMapper.selectGuestList(custId, searchKeyword, orderBy, orderDirection, offset, pageSize);
    }

    // 전화고객 정보 저장/수정
}
