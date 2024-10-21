package com.ipcc.common.mapper.primary;

import com.ipcc.crm.model.dto.counsel.CounselLog;
import com.ipcc.crm.model.dto.counsel.CounselLogFilter;
import com.ipcc.crm.model.dto.guest.Guest;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GuestMapper {

    // 전화고객 정보 검색
    List<Guest> searchGuestList(Guest guest);

    // 고객 리스트 검색 메서드 (총 숫자 파악)
    int countGuestList(String custId, String searchKeyword);

    // 고객 리스트 검색 메서드 (페이징 처리 된 리스트 조회)
    List<Guest> selectGuestList(String custId, String searchKeyword, String orderBy, String orderDirection, int offset, int pageSize);

    // 선택 고객 정보 조회 메서드
    Guest selectGuestInfo(String guestId);

    // 고객 정보 저장 메서드
    int saveGuestInfo(Guest guest);

    // 고객 정보 저장 전 전화번호 중복 검사
    int checkPhoneDuplicate(String guestId, String phone);

    // 선택 고객의 상담이력 수 조회 (페이징 처리 용 )
    int countCounselLogList(CounselLogFilter Filter);
    // 선택 고객의 상담이력 리스트 조회
    List<CounselLog> getCounselLogList(CounselLogFilter filter, String orderBy, String orderDirection, int offset, int pageSize);

}
