package com.ipcc.common.controller;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebSocketController extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // WebRTC 클라이언트로부터 수신된 메시지를 처리합니다.
        String payload = message.getPayload();
        // 수신된 payload를 처리하고 필요 시 응답 메시지를 전송합니다.
        session.sendMessage(new TextMessage("Message received: " + payload));

        System.out.println("들어가나?");
    }
}
