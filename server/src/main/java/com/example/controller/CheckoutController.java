package com.example.controller;

import com.example.dto.*;
import com.example.dto.user.AddressDTO;
import com.example.dto.user.CartItemDTO;
import com.example.dto.user.CheckoutDTO;
import com.example.dto.user.PaymentDTO;
import com.example.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Malloy on 4/7/2017.
 */
@RestController
@RequestMapping("/checkout")
@SessionAttributes({"cartItems", "addressID", "paymentID"})
@PreAuthorize("isAuthenticated()")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;


    @PostMapping("/prepareItems")
    public ResponseMessage prepareItems(
            HttpSession session,
            @RequestBody List<CartItemDTO> items,
            ModelMap modelMap
    ) {

        ResponseMessage message = new ResponseMessage();

        modelMap.addAttribute("cartItems", items);

        message.setResult(items.size() > 0);
        return message;
    }

    @PostMapping("/preparePayment")
    public ResponseMessage preparePayment(
            ModelMap modelMap,
            @RequestBody PaymentDTO paymentDTO
    ) {
        ResponseMessage message = new ResponseMessage();

        if (paymentDTO == null) {
            message.setResult(false);
            return message;
        }

        modelMap.addAttribute("paymentID", paymentDTO.getId());
        message.setResult(true);

        return message;
    }

    @PostMapping("/prepareAddress")
    public ResponseMessage prepareAddress(
            ModelMap modelMap,
            @RequestBody AddressDTO addressDTO
    ) {
        ResponseMessage message = new ResponseMessage();

        if (addressDTO == null) {
            message.setResult(false);
            return message;
        }

        modelMap.addAttribute("addressID", addressDTO.getId());
        message.setResult(true);

        return message;
    }

    @GetMapping("/doCheckout")
    public ResponseMessage doCheckout(
            @SessionAttribute("cartItems") List<CartItemDTO> cartItems,
            @SessionAttribute("paymentID") Long paymentID,
            @SessionAttribute("addressID") Long addressID,
            SessionStatus sessionStatus,
            HttpSession session
    ) {
        ResponseMessage message = new ResponseMessage();

        if (cartItems == null || cartItems.size() == 0 || paymentID == null || addressID == null) {
            message.setResult(false);
            return message;
        }

        long userID = (long) session.getAttribute("userID");

        boolean result = this.checkoutService.doCheckout(userID, cartItems, paymentID, addressID);

        if (result) {
            sessionStatus.setComplete();
        }

        message.setResult(result);
//        message.setResult(paymentDTO != null && addressDTO != null);
        return message;
    }

    @GetMapping("/getCheckoutList")
    public ResponseMessage getCheckoutList(
            HttpSession session,
            @SessionAttribute("cartItems") List<CartItemDTO> cartItems,
            ModelMap modelMap) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }

        CheckoutDTO checkoutDTO = this.checkoutService.getCheckoutList(userID);

        modelMap.addAttribute("paymentID", checkoutDTO.getPayment().getId());
        modelMap.addAttribute("addressID", checkoutDTO.getAddress().getId());

        checkoutDTO.setCartItems(cartItems);
//        for (CartItemDTO cartItemDTO : checkoutDTO.getCartItems()) {
//            System.out.println("checkout cart item: " + cartItemDTO);
//        }
//        System.out.println("checkout payment: " + checkoutDTO.getPayment());
//        System.out.println("checkout address: " + checkoutDTO.getAddress());
        message.setResult(true);
        message.setObject(checkoutDTO);
        return message;
    }
}
