package com.ipcc.crm.model.dto.guest;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Guest {
    private String guestId;
    private String custId;
    private String agentId;
    private String name;
    private String birthDay;
    private String gender;
    private String grade;
    private String email;
    private String address;
    private String phone;
    private String enrollDate;
    private String unrollDate;
    private String guestMemo;
    private String black;
    private String state;
}
