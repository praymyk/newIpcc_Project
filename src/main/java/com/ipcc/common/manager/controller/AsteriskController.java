package com.ipcc.common.manager.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.ipcc.common.service.AsteriskService;
import lombok.extern.slf4j.Slf4j;
import org.asteriskjava.manager.response.ManagerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Slf4j
@Controller
public class AsteriskController {

    @Autowired
    private AsteriskService asteriskService;

    // Asterisk Endpoint 정보 모니터링 페이지 이동용
    @GetMapping("/test")
    public String endpointInfo(Model model) {

        // Asterisk 서버에 등록된 모든 endpoint 정보를 가져오기
        List<Map<String, Object>> endpoints = asteriskService.getEndpoints();

        log.info("endpoints : " + endpoints);
        model.addAttribute("endpoints", endpoints);
        return "manager/manager-monitor";
    }

    // Asterisk Endpoint 정보 모니터링용 메서드 (Ajax)
    @GetMapping("/endpointMT")
    @ResponseBody
    public List<Map<String, Object>> getEndpoints() {
        List<Map<String, Object>> endpoints = asteriskService.getEndpoints();
        //log.info("endpoints : " + endpoints);

        return endpoints;
    }

    // ARI Asterisk PJSIP 채널 정보 모니터링용 메서드 (Ajax)
    @GetMapping("/pjsipChannelsMT")
    @ResponseBody
    public List<JsonNode> getPjsipChannels() {
        List<JsonNode> channels = asteriskService.getPjsipChannels();
        //log.info("pjsip channels : " + channels);
        return channels;
    }

    // AMI Asterisk PJSIP 채널 정보 모니터링용 메서드 (Ajax)
    @GetMapping("/amiPjsipChannelsMT")
    @ResponseBody
    public List<String> AmiGetPjsipChannels() {
        List<String> channels = asteriskService.amiGetPjsipChannels();
        log.info("pjsip channels2 : " + channels);
        return channels;
    }

    @GetMapping("/amiPjsipChannelsMT2")
    @ResponseBody
    public List<String> getPjsipChannels2() {

        log.info("pjsip channels2 : " + asteriskService.getAmiPjsipChannels());
        return asteriskService.getAmiPjsipChannels();

    }
}

