package com.ipcc.common.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;

@Service
public class AsteriskService {

    @Value("${asterisk.ari.url}")
    private String asteriskAriUrl;

    @Value("${asterisk.ari.username}")
    private String username;

    @Value("${asterisk.ari.password}")
    private String password;

    public String getEndpoints() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(username, password);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                asteriskAriUrl + "/endpoints",
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
}