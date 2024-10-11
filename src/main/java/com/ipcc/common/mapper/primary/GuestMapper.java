package com.ipcc.common.mapper.primary;

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

    // 전화고객 정보 저장/수정
}
