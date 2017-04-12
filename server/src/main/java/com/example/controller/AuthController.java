package com.example.controller;

import com.example.dto.ResponseMessage;
import com.example.dto.user.UserDTO;
import com.example.model.user.profile.User;
import com.example.service.UserService;
import com.example.validator.FormValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
        System.out.println(user);
        if(bindingResult.hasErrors()){
            message.setResult(false);
        }
        else {
            boolean result = this.userService.signup(user);
            message.setResult(result);
        }

        System.out.println(message.toString());
        return message;
    }


    @PostMapping("/isEmailTaken")
    public ResponseMessage isEmailTaken(@RequestBody String email){
        boolean result=this.userService.isEmailTaken(email);
        System.out.println("is email taken: "+result);
        ResponseMessage message= new ResponseMessage();
        message.setResult(result);
        return message;
    }

    @GetMapping("/getCurrentUser")
    public ResponseMessage getCurrentUser(){
        UserDTO user=this.userService.getCurrentUser();
        ResponseMessage message= new ResponseMessage();
        message.setResult(user!=null);
        message.setObject(user);
        return message;
    }
}
