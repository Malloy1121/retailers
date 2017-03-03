package com.example.controller;

import com.example.model.user.Order;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Malloy on 3/2/2017.
 */
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;


    @GetMapping("/getAllOrders")
    public List<Order> getAllOrders(){
        return this.orderService.findAll();
    }

}
