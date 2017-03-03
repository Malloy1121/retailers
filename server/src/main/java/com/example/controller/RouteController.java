package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Malloy on 2/27/2017.
 */

@Controller
public class RouteController {

    @RequestMapping({"/","/login"})
    public String home(){
        return "forward:/index.html";
    }
}
