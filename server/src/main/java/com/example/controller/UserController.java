package com.example.controller;

import com.example.dto.AddressDTO;
import com.example.dto.ResponseMessage;
import com.example.dto.UserDTO;
import com.example.model.user.Address;
import com.example.model.user.User;
import com.example.service.AddressService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Malloy on 3/3/2017.
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;

    @GetMapping("/getAllUsers")
    public List<UserDTO> getAllUsers(){
        return this.userService.findAllUsers();
    }

    @GetMapping("/getUserAddresses")
//    @PreAuthorize("isAuthenticated()")
    public List<AddressDTO> getUserAddresses(HttpServletRequest request){
        long userID=(long)request.getSession().getAttribute("userID");
        return this.addressService.findAddressByUser(userID);
    }

//    @PostMapping("/getUserAddresses")
////    @PreAuthorize("isAuthenticated()")
//    public List<AddressDTO> getUserAddresses(@RequestBody UserDTO user){
////        long userID=(long)request.getSession().getAttribute("userID");
//        long id=user.getId();
//        return this.addressService.findAddressByUser(id);
//    }

    @PostMapping("/updateProfile")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage updateProfile(@RequestBody User user, HttpSession session){
        ResponseMessage message=new ResponseMessage();
        return message;
    }

    @PostMapping("/changePassword")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage changePassword(@RequestBody User user, HttpSession session){
        ResponseMessage message=new ResponseMessage();
        return message;
    }

    @PostMapping("/addNewAddress")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage addNewAddress(@RequestBody Address address,HttpSession session){
        long userID=(long)session.getAttribute("userID");
        ResponseMessage message=new ResponseMessage();
        return message;
    }

    @PostMapping("/editAddress")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage editAddress(@RequestBody Address address,HttpSession session){
        ResponseMessage message=new ResponseMessage();
        return message;
    }

    @PostMapping("/deleteAddress")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage deleteAddress(@RequestBody Address address){
//        long id=user.getId();
        ResponseMessage message=new ResponseMessage();
        return message;
    }

}
