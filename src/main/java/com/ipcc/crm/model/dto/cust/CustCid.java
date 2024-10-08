package com.ipcc.crm.model.dto.cust;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class CustCid {

    private String custId; // 업체식별 ID
    private String custCid; // 대표번호
    private String custCode ; // 업체코드
    private String custDid; // DID번호
}
