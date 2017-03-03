package com.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by Malloy on 2/28/2017.
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private AuthenticationSuccessHandler authenticationSuccessHandler;
    private AuthenticationFailureHandler authenticationFailureHandler;
    private LogoutSuccessHandler logoutSuccessHandler;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Autowired
    private UserDetailsService userService;

    @Autowired
    public void setAuthenticationSuccessHandler(AuthenticationSuccessHandler loginSuccessHandler) {
        this.authenticationSuccessHandler = loginSuccessHandler;
    }

    @Autowired
    public void setAuthenticationFailureHandler(AuthenticationFailureHandler loginFailureHandler) {
        this.authenticationFailureHandler = loginFailureHandler;
    }

    @Autowired
    public void setLogoutSuccessHandler(LogoutSuccessHandler userLogoutSuccessHandler) {
        this.logoutSuccessHandler = userLogoutSuccessHandler;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(this.userService)
                .passwordEncoder(this.passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        this.login(http);
        this.logout(http);
        this.csrf(http);
        this.authorizeRequests(http);

    }


    protected void login(HttpSecurity http) throws Exception {
        http
                .formLogin()
                .permitAll()
                .loginPage("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .successHandler(this.authenticationSuccessHandler)
                .failureHandler(this.authenticationFailureHandler);
    }

    protected void logout(HttpSecurity http) throws Exception {
        http
                .logout()
                .permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessHandler(this.logoutSuccessHandler)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
    }

    protected void csrf(HttpSecurity http) throws Exception {
        CookieCsrfTokenRepository repository = new CookieCsrfTokenRepository();
        http
                .csrf()
                .disable();
//                .csrfTokenRepository(repository);
    }

    protected void authorizeRequests(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .mvcMatchers("/admin/**")
                .hasRole("ADMIN")
                .mvcMatchers("/pay")
                .fullyAuthenticated()
                .mvcMatchers("/account/**")
                .authenticated()
                .mvcMatchers("/**")
                .permitAll();
    }

}
