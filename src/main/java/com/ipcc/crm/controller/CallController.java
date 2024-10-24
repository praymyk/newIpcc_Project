package com.ipcc.crm.controller;
import com.ipcc.crm.model.dto.cust.CustCid;
import com.ipcc.crm.service.CallService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Slf4j
@Controller
@RequestMapping("/crm")
public class CallController {

    private final CallService callService;

    public CallController(CallService callService) {
        this.callService = callService;
    }

    // 업체별 cid(대표번호) 조회용 함수 ( API로 asterisk 한테서 받아오는 형태로 변경 필요 )
    @RequestMapping("/call/getCustCid")
    @ResponseBody
    public List<CustCid> getCustCid(String custCode) {

        log.info("custCode : " + custCode);

        List<CustCid> custCidList = callService.getCustCid(custCode);

        log.info("custCidList : " + custCidList);

        return null;
    }

}
