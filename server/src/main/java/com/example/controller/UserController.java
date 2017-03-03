package com.example.controller;

import com.example.dto.AddressDTO;
import com.example.dto.UserDTO;
import com.example.model.user.Address;
import com.example.service.AddressService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    @PreAuthorize("isAuthenticated()")
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

    @PostMapping("/addNewAddress")
//    @PreAuthorize("isAuthenticated()")
    public Boolean addNewAddress(@RequestBody Address address,HttpServletRequest request){
        long userID=(long)request.getSession().getAttribute("userID");
        return new Boolean(this.addressService.addNewAddress(address,userID));
    }

    @PostMapping("/deleteAddress")
//    @PreAuthorize("isAuthenticated()")
    public Boolean deleteAddress(@RequestBody UserDTO user){
        long id=user.getId();
        return new Boolean(this.addressService.deleteAddress(id));
    }

}
