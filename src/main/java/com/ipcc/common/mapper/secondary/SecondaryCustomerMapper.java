package com.ipcc.common.mapper.secondary;

import com.ipcc.crm.model.dto.cust.CustCid;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SecondaryCustomerMapper {
    
    // 고객사 CID 리스트 조회
    List<CustCid> getCustCid(String custCode);
}
