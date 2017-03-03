package com.example.config;

import com.example.model.user.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Malloy on 2/28/2017.
 */

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        User user=this.userService.findUserByEmail(request.getParameter("email"));
        if(user==null){
            response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
            throw new IOException("User not found");
        }
        long id=user.getId();
        request.getSession().setAttribute("userID",id);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}

