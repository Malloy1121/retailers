package com.example.config;

import com.example.dto.UserDTO;
import com.example.model.user.User;
import com.example.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("Login successful");
        String username = request.getParameter("email");
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserDTO user = this.userService.findUserByEmail(username);
//        if (user == null) {
//            response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
//            throw new IOException("User not found");
//        }
        long id = user.getId();
        request.getSession().setMaxInactiveInterval(900);
        request.getSession().setAttribute("userID", id);
        authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        response.setStatus(HttpServletResponse.SC_OK);
        System.out.println(this.objectMapper.writeValueAsString(user));
        response.getOutputStream().print(this.objectMapper.writeValueAsString(user));

    }
}

