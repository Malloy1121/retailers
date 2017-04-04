package com.example.controller;

import com.example.dto.CartItemDTO;
import com.example.dto.ResponseMessage;
import com.example.model.user.Order;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Malloy on 3/2/2017.
 */
@RestController
@RequestMapping("/orders")
@PreAuthorize("isAuthenticated()")
public class OrderController {
    @Autowired
    private OrderService orderService;

//    @GetMapping("/getAllOrders")
//    public List<Order> getAllOrders(){
//        return this.orderService.findAll();
//    }

    @GetMapping("/getCartItems")
    public ResponseMessage getCartItems(HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long userID = (Long) session.getAttribute("userID");
        if (userID == null) {
            message.setResult(false);
            return message;
        }
        message.setResult(true);
        message.setObject(this.orderService.getCartItems(userID));
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
        message.setResult(this.orderService.deleteCartItem(id));
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
        message.setObject(this.orderService.getCartItemAmount(userID));
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
        message.setObject(this.orderService.getWishListItems(userID));
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

        message.setResult(this.orderService.addToCart(userID, cartItemDTO));
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

        message.setResult(this.orderService.addToWishList(userID, cartItemDTO));
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

        message.setResult(this.orderService.removeWishListItem(id, userID));
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

        message.setResult(this.orderService.clearWishList(userID));
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

        message.setResult(this.orderService.moveOneFromWishListToCart(userID, cartItemDTO));
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

        message.setResult(this.orderService.moveAllFromWishListToCart(userID, cartItemDTO));
        return message;
    }

}
