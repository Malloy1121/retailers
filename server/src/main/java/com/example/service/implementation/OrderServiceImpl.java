package com.example.service.implementation;

import com.example.dto.ResponseMessage;
import com.example.dto.user.OrderDTO;
import com.example.dto.user.OrderItemDTO;
import com.example.model.user.order.Order;
import com.example.model.user.order.OrderItem;
import com.example.repository.OrderRepo;
import com.example.service.OrderService;
import com.example.utility.MapUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.*;

/**
 * Created by Malloy on 4/11/2017.
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Override
    public boolean cancelOrder(OrderDTO order) {
        return false;
    }

    @Override
    public boolean updateOrder(OrderDTO order) {
        return false;
    }

    @Override
    public ResponseMessage getOrders(long userID, int pageNumber, int index) {
        Pageable request = new PageRequest(pageNumber - 1, 5, Sort.Direction.DESC, "createTime");

        Page<Order> orders;

        switch (index) {
            case 1:
                orders = this.orderRepo.findAllByUserId(userID, request);
                break;
            case 2:
                orders = this.orderRepo.findByUserIdAndStatusIdGreaterThanEqualAndStatusIdLessThanEqual(userID, 1, 4, request);
                break;
            case 3:
                orders = this.orderRepo.findByUserIdAndStatusIdEquals(userID, 5, request);
                break;
            case 4:
                orders = this.orderRepo.findByUserIdAndStatusIdEquals(userID, 6, request);
                break;
            default:
                orders = this.orderRepo.findAllByUserId(userID, request);
        }

        List<OrderDTO> mappedOrders = new ArrayList<>();

        for (Order order : orders) {
            OrderDTO orderDTO = MapUtility.mapOrder(order);
            mappedOrders.add(orderDTO);
        }

        GregorianCalendar calendar=new GregorianCalendar();
        ResponseMessage message=new ResponseMessage();
        message.setObject(mappedOrders);
        message.setTotalPages(orders.getTotalPages());
        return message;
    }

    @Override
    public OrderDTO findOrderByID(long id,long userID) {

        Optional<Order> orderOptional = this.orderRepo.findByIdAndUserId(id,userID);

        if (!orderOptional.isPresent()) {
            return null;
        }

        OrderDTO orderDTO = MapUtility.mapOrder(orderOptional.get());

        return orderDTO;
    }
}
