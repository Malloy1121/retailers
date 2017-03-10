package com.example.config;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

/**
 * Created by Malloy on 3/8/2017.
 */
public class MyCsrfFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println(request.getAttribute("_csrf"));
        System.out.println(request.getHeader("X-XSRF-TOKEN"));

        Cookie[] cookies = request.getCookies();

//        for (Cookie cookie : cookies) {
//            if (cookie.getName().equals(SecurityConfig.CSRF_TOKEN_COOKIE_NAME)) {
//                System.out.println(cookie.getValue());
//            }
//        }

        Enumeration<String> headers = request.getHeaderNames();

        while (headers.hasMoreElements()) {
            String header = headers.nextElement();
            System.out.println("Header name: " + header + "; Header value: " + request.getHeader(header));
        }


        System.out.println();

        filterChain.doFilter(request, response);
    }
}
