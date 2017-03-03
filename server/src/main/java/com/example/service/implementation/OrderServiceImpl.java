package com.example.service.implementation;

import com.example.dto.ItemDTO;
import com.example.dto.OrderDTO;
import com.example.model.user.Order;
import com.example.repository.OrderRepo;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Malloy on 3/2/2017.
 */
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepo orderRepo;

    @Override
    public boolean makeAnOrder(List<ItemDTO> items) {
        return false;
    }

    @Override
    public boolean cancelOrder(OrderDTO order) {
        return false;
    }

    @Override
    public boolean updateOrder(OrderDTO order) {
        return false;
    }

    @Override
    public List<Order> findAll() {
        return this.orderRepo.findAll();
    }

    @Override
    public Order findOrderByID(long id) {
        return null;
    }
}
