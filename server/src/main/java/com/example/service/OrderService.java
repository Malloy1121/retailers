package com.example.service;

import com.example.dto.ItemDTO;
import com.example.dto.OrderDTO;
import com.example.model.user.Order;

import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */
public interface OrderService {

    boolean makeAnOrder(List<ItemDTO> items);

    boolean cancelOrder(OrderDTO order);

    boolean updateOrder(OrderDTO order);

    List<Order> findAll();

    Order findOrderByID(long id);
}
