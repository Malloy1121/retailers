package com.example.service;

import com.example.dto.user.CartItemDTO;
import com.example.dto.business.ItemDTO;
import com.example.dto.user.OrderDTO;

import java.util.Collection;
import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */
public interface OrderService {

    boolean cancelOrder(OrderDTO order);

    boolean updateOrder(OrderDTO order);

    List<OrderDTO> getOrders(long userID,int pageNumber,int index);

    OrderDTO findOrderByID(long id,long userID);


}
