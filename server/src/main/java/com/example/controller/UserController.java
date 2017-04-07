package com.example.controller;

import com.example.dto.AddressDTO;
import com.example.dto.ResponseMessage;
import com.example.dto.UserDTO;
import com.example.model.user.Address;
import com.example.model.user.State;
import com.example.model.user.User;
import com.example.service.AddressService;
import com.example.service.UserService;
import com.example.validator.FormValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
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
    public List<UserDTO> getAllUsers() {
        return this.userService.findAllUsers();
    }

    @GetMapping("/getUserAddresses")
//    @PreAuthorize("isAuthenticated()")
    public List<AddressDTO> getUserAddresses(HttpServletRequest request) {
        long userID = (long) request.getSession().getAttribute("userID");
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
    public ResponseMessage updateProfile(@RequestBody UserDTO user, HttpSession session, BindingResult bindingResult) {
        ResponseMessage message = new ResponseMessage();
        long userID = (long) session.getAttribute("userID");
        boolean result = this.userService.updateProfile(user, userID);
        message.setResult((!bindingResult.hasErrors()) && result);
        return message;
    }

    @PostMapping("/changePassword")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage changePassword(@RequestBody @Validated(value = FormValidator.class) User user, HttpSession session, BindingResult bindingResult) {
        ResponseMessage message = new ResponseMessage();
        long userID = (long) session.getAttribute("userID");
        boolean result = this.userService.changePassword(user.getCurrentPassword(), user.getPassword(), userID);
        if (!result) {
            message.setInfo("Incorrect password");
        }

        if (bindingResult.hasErrors()) {
            message.setInfo("Invalid input");
        }
        message.setResult((!bindingResult.hasErrors()) && result);
        return message;
    }

    @PostMapping("/addNewAddress")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage addNewAddress(@RequestBody AddressDTO address, HttpSession session) {
        long userID = (long) session.getAttribute("userID");
        ResponseMessage message = new ResponseMessage();
        boolean result = this.addressService.addNewAddress(address, userID);
        message.setResult(result);
        return message;
    }

    @PostMapping("/editAddress")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage editAddress(@RequestBody AddressDTO address, HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        long userID = (long) session.getAttribute("userID");
        boolean result;
        if (address.getId() >= 0) {
            result = this.addressService.updateAddress(address, userID);
        } else {
            result = false;
        }
        message.setResult(result);
        return message;
    }

    @PostMapping("/deleteAddress")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage deleteAddress(@RequestBody AddressDTO address) {
//        long id=user.getId();
        ResponseMessage message = new ResponseMessage();
        boolean result;
        if (address.getId() >= 0) {
            result = this.addressService.deleteAddress(address.getId());
        } else {
            result = false;
        }

        message.setResult(result);
        return message;
    }

    @GetMapping("/getCurrentAddresses")
    @PreAuthorize("isFullyAuthenticated()")
    public ResponseMessage getCurrentAddresses(HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        List<AddressDTO> result = this.addressService.findAddressByUser((Long) session.getAttribute("userID"));
        message.setObject(result);
        message.setResult(true);
        for (AddressDTO address : result) {
            System.out.println(address);
        }
        return message;
    }

    @GetMapping("/getStateList")
    public ResponseMessage getStateList() {
        ResponseMessage message = new ResponseMessage();
        List<State> result = this.addressService.findAllStates();
        message.setResult(true);
        message.setObject(result);
        return message;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/setAddressToDefault")
    public ResponseMessage setAddressToDefault(@RequestBody AddressDTO addressDTO, HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        boolean result = this.addressService.setAddressToDefault(addressDTO, userID);
        message.setResult(result);
        return message;
    }

}
