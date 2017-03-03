package com.example.controller;

import com.example.dto.ResponseMessage;
import com.example.dto.UserDTO;
import com.example.model.user.User;
import com.example.service.UserService;
import com.example.validator.FormValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Malloy on 3/1/2017.
 */

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseMessage signup(@Validated(value = FormValidator.class)@RequestBody User user,
                                  BindingResult bindingResult){
        ResponseMessage message= new ResponseMessage();
        System.out.println("signUp: "+user.getPassword()+"; "+user.getConfirmedPassword());
        if(bindingResult.hasErrors()){
            message.setSuccessful(false);
        }
        else {
            boolean result = this.userService.signup(user);
            message.setSuccessful(result);
        }
        return message;
    }


    @PostMapping("/isEmailTaken")
    public Boolean isEmailTaken(@RequestBody String email){
        return new Boolean(this.userService.isEmailTaken(email));
    }
}
