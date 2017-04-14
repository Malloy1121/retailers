package com.example.controller;

import com.example.dto.ResponseMessage;
import com.example.dto.user.OrderDTO;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Malloy on 4/11/2017.
 */

@RestController
@RequestMapping("/order")
@PreAuthorize("isAuthenticated()")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/getOrders/{index}/{page}")
    public ResponseMessage getOrders(
            HttpSession session,
            @PathVariable("page") int page,
            @PathVariable("index") int index
    ) {
        ResponseMessage message = new ResponseMessage();
        long userID = (long) session.getAttribute("userID");

        message = this.orderService.getOrders(userID,page,index);

        message.setResult(true);

        return message;
    }

    @GetMapping("/getOrderDetail/{id}")
    public ResponseMessage getOrderDetail(
            HttpSession session,
            @PathVariable("id") long id
    ) {
        ResponseMessage message = new ResponseMessage();
        long userID=(long)session.getAttribute("userID");
        OrderDTO order=this.orderService.findOrderByID(id,userID);

        message.setResult(order!=null);

        message.setObject(order);

        return message;
    }
}
