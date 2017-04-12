package com.example.controller;

import com.example.dto.user.CartItemDTO;
import com.example.dto.ResponseMessage;
import com.example.service.CartService;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Malloy on 3/2/2017.
 */
@RestController
@RequestMapping("/cart")
@PreAuthorize("isAuthenticated()")
public class CartController {
    @Autowired
    private CartService cartService;

//    @GetMapping("/getAllOrders")
//    public List<Order> getAllOrders(){
//        return this.orderService.findAll();
//    }

    @GetMapping("/getCartItems")
    public ResponseMessage getCartItems(HttpSession session, SessionStatus sessionStatus) {

        sessionStatus.setComplete();

        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }
        message.setResult(true);
        message.setObject(this.cartService.getCartItems(userID));
        return message;
    }

    @DeleteMapping("/deleteCartItem/{id}")
    public ResponseMessage deleteCartItem(@PathVariable(name = "id") Long id, HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }
        message.setResult(this.cartService.deleteCartItem(id));
        return message;
    }

    @GetMapping("/getCartItemAmount")
    public ResponseMessage getCartItemAmount(HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }
        message.setResult(true);
        message.setObject(this.cartService.getCartItemAmount(userID));
        return message;
    }

    @GetMapping("/getWishListItems")
    public ResponseMessage getWishListItems(HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }
        message.setResult(true);
        message.setObject(this.cartService.getWishListItems(userID));
        return message;
    }

    @PostMapping("/addToCart")
    public ResponseMessage addToChart(HttpSession session, @RequestBody CartItemDTO cartItemDTO) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }

        message.setResult(this.cartService.addToCart(userID, cartItemDTO));
        return message;
    }

    @PostMapping("/addToWishList")
    public ResponseMessage addToWishList(HttpSession session, @RequestBody CartItemDTO cartItemDTO) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }

        message.setResult(this.cartService.addToWishList(userID, cartItemDTO));
        return message;
    }

    @DeleteMapping("/removeWishListItem/{id}")
    public ResponseMessage removeWishListItem(HttpSession session, @PathVariable Long id) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }

        message.setResult(this.cartService.removeWishListItem(id, userID));
        return message;
    }

    @DeleteMapping("/clearWishList")
    public ResponseMessage clearWishList(HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }

        message.setResult(this.cartService.clearWishList(userID));
        return message;
    }

    @PostMapping("/moveOneFromWishListToCart")
    public ResponseMessage moveOneFromWishListToCart(HttpSession session, @RequestBody CartItemDTO cartItemDTO) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }

        message.setResult(this.cartService.moveOneFromWishListToCart(userID, cartItemDTO));
        return message;
    }

    @PostMapping("/moveAllFromWishListToCart")
    public ResponseMessage moveAllFromWishListToCart(HttpSession session, @RequestBody List<CartItemDTO> cartItemDTO) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }

        message.setResult(this.cartService.moveAllFromWishListToCart(userID, cartItemDTO));
        return message;
    }

}
