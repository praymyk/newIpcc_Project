package com.ipcc.crm.service;

import com.ipcc.common.mapper.primary.GuestMapper;
import com.ipcc.crm.model.dto.counsel.CounselLog;
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

    // 선택 고객 정보 조회
    public Guest selectGuestInfo(String guestId) {
        return guestMapper.selectGuestInfo(guestId);
    }

    // 고객 정보 저장/수정
    public int saveGuestInfo(Guest guest) {
        return guestMapper.saveGuestInfo(guest);
    }

    // 고객 정보 저장/수정 시 전화번호 중복 검사
    public int checkPhoneDuplicate(String guestId, String phone) {
        return guestMapper.checkPhoneDuplicate(guestId, phone);
    }

    // 선택 고객의 상담이력 수 조회 (페이징 처리 용 )
    public int countCounselLogList(String guestId, String searchKeyword) {
        return guestMapper.countCounselLogList(guestId, searchKeyword);
    }

    // 선택 고객의 상담이력 조회
    public List<CounselLog> getCounselLogList(String guestId) {
        return null;
    }


    // 전화고객 정보 저장/수정
}
