package com.example.dto;

/**
 * Created by Malloy on 2/28/2017.
 */
public class ResponseMessage {
    private int status;
    private boolean isSuccessful;
    private String info;
    private Object object;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isSuccessful() {
        return isSuccessful;
    }

    public void setSuccessful(boolean successful) {
        isSuccessful = successful;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
