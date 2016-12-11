package ru.disdev.entity;

import java.util.ArrayList;
import java.util.List;

public class RestResponse<T> {
    private int errorCode = 0;
    private String errorMessage = "";
    private List<T> result = new ArrayList<>();

    public RestResponse() {
    }

    public RestResponse(T result) {
        this.result.add(result);
    }

    public RestResponse(List<T> result) {
        this.result = result;
    }

    public RestResponse(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public RestResponse(int errorCode, String errorMessage, List<T> result) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.result = result;
    }

    public RestResponse(int errorCode, String errorMessage, T result) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.result.add(result);
    }

    public List<T> getResult() {
        return result;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public void addResult(T result) {
        this.result.add(result);
    }

    public void setResult(List<T> result) {
        this.result = result;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
