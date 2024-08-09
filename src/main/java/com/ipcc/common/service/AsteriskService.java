package com.ipcc.common.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.asteriskjava.manager.ManagerConnection;
import org.asteriskjava.manager.ManagerConnectionFactory;
import org.asteriskjava.manager.ManagerConnectionState;
import org.asteriskjava.manager.action.CommandAction;
import org.asteriskjava.manager.response.CommandResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class AsteriskService {

    // ARI 연결 용 변수
    @Value("${asterisk.ari.url}")
    private String asteriskAriUrl;
    @Value("${asterisk.ari.username}")
    private String ariUsername;
    @Value("${asterisk.ari.password}")
    private String ariPassword;

    // AMI 연결 용 변수
    private final ManagerConnection managerConnection;
    private final ObjectMapper objectMapper;

    public AsteriskService(
            @Value("${asterisk.ami.host}") String host,
            @Value("${asterisk.ami.port}") int port,
            @Value("${asterisk.ami.username}") String username,
            @Value("${asterisk.ami.password}") String password) {
        ManagerConnectionFactory factory = new ManagerConnectionFactory(host, port, username, password);
        this.managerConnection = factory.createManagerConnection();
        this.objectMapper = new ObjectMapper();
    }

    // AMI API를 통해 Asterisk 서버에 등록된 모든 PJSIP 채널 정보를 가져옵니다
    public List<String> amiGetPjsipChannels() {
        try {
            managerConnection.login();
            CommandAction action = new CommandAction("pjsip show channels");
            CommandResponse response = (CommandResponse) managerConnection.sendAction(action);
            managerConnection.logoff();

            return response.getResult();

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert result to JSON", e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to execute pjsip show channels", e);
        }
    }
    
    // AMI API 사용을 위한 로그인 작업
    public List<String> getAmiPjsipChannels() {
        try {
            if (managerConnection.getState() != ManagerConnectionState.CONNECTED) {
                managerConnection.login();
            }
            CommandAction action = new CommandAction("pjsip show channels");
            CommandResponse response = (CommandResponse) managerConnection.sendAction(action);
            managerConnection.logoff();

            return response.getResult();

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert result to JSON", e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to execute pjsip show channels", e);
        }
    }



    // Asterisk ARI API를 통해 Asterisk 서버에 등록된 모든 endpoint 정보를 가져옵니다
    public List<Map<String, Object>> getEndpoints() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(ariUsername, ariPassword);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                asteriskAriUrl + "/endpoints",
                HttpMethod.GET,
                entity,
                String.class
        );

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(response.getBody(), List.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse endpoints JSON", e);
        }
    }

    // Asterisk ARI API를 통해 Asterisk 서버에 등록된 모든 PJSIP 채널 정보를 가져오기
    public List<JsonNode> getPjsipChannels() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(ariUsername, ariPassword);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                asteriskAriUrl + "/channels",
                HttpMethod.GET,
                entity,
                String.class
        );

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(response.getBody(), List.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse channels JSON", e);
        }
    }





}