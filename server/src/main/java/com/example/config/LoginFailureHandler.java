package com.example.config;

import com.example.dto.ResponseMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Malloy on 2/28/2017.
 */

@Component
public class LoginFailureHandler implements AuthenticationFailureHandler {
    @Autowired
    ObjectMapper objectMapper;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("Login failed");
        ResponseMessage message=new ResponseMessage();
        message.setResult(false);
        response.getOutputStream().print(this.objectMapper.writeValueAsString(message));
    }
}
