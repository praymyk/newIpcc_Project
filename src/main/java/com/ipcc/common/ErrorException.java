package com.ipcc.common;

// 에러 치리용 Exception
public class ErrorException extends RuntimeException {
    private final ErrorCode errorCode;

    public ErrorException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

}