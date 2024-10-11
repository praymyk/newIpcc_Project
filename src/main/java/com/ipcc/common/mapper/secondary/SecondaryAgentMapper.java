package com.ipcc.common.mapper.secondary;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SecondaryAgentMapper {
    // 상담원 정보 업데이트 시 내선번호 등록용
    int insertEndpoint(String agtExt);
    int insertAors(String agtExt);
    int insertAuths(String agtExt);
}
