package com.ipcc.crm.service;

import com.ipcc.common.mapper.secondary.SecondartyCustomerMapper;
import com.ipcc.crm.model.dto.cust.CustCid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CallService {

    private final SecondartyCustomerMapper secondartyCustomerMapper;

    public CallService(SecondartyCustomerMapper secondartyCustomerMapper) {
        this.secondartyCustomerMapper = secondartyCustomerMapper;
    }

    // 업체별 cid(대표번호) 조회용 함수
    public List<CustCid> getCustCid(String custCode) {
        return secondartyCustomerMapper.getCustCid(custCode);
    }
}
