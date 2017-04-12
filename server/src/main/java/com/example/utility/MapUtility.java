package com.example.utility;

import com.example.dto.business.ItemDTO;
import com.example.dto.business.ItemTypeDTO;
import com.example.dto.user.AddressDTO;
import com.example.dto.user.OrderDTO;
import com.example.dto.user.OrderItemDTO;
import com.example.dto.user.PaymentDTO;
import com.example.model.business.Item;
import com.example.model.business.ItemType;
import com.example.model.business.State;
import com.example.model.user.order.Order;
import com.example.model.user.order.OrderItem;
import com.example.model.user.profile.Address;
import com.example.model.user.profile.Payment;
import com.example.model.user.profile.User;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Malloy on 4/11/2017.
 */
public class MapUtility {

    public static ItemDTO mapItem(Item item) {
        ItemDTO itemDTO = new ItemDTO();

        return itemDTO;
    }

    public static ItemTypeDTO mapItemType(ItemType itemType) {
        ItemTypeDTO itemTypeDTO = new ItemTypeDTO();

        itemTypeDTO.setId(itemType.getId());
        itemTypeDTO.setUnitPrice(itemType.getUnitPrice());
        itemTypeDTO.setInventory(itemType.getInventory());
        itemTypeDTO.setName(itemType.getName());

        return itemTypeDTO;
    }

    public static PaymentDTO mapPayment(Payment payment) {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setId(payment.getId());
        paymentDTO.setIsPrimary(payment.getIsPrimary() == 1);
        paymentDTO.setMonth(payment.getMonth());
        paymentDTO.setYear(payment.getYear());
        paymentDTO.setName(payment.getName());
        paymentDTO.setNumber(payment.getNumber());
        paymentDTO.setStreet(payment.getStreet());
        paymentDTO.setCity(payment.getCity());
        paymentDTO.setState(payment.getState().getState());
        paymentDTO.setStateID(payment.getState().getId());
        paymentDTO.setSuite(payment.getSuite());
        paymentDTO.setZipcode(payment.getZipcode());

        return paymentDTO;
    }

    public static Payment mapPaymentDTO(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        payment.setName(paymentDTO.getName());
        payment.setNumber(paymentDTO.getNumber());
        payment.setMonth(paymentDTO.getMonth());
        payment.setYear(paymentDTO.getYear());
        payment.setStreet(paymentDTO.getStreet());
        payment.setCity(paymentDTO.getCity());
        State state = new State();
        state.setId(paymentDTO.getStateID());
        payment.setState(state);
        payment.setSuite(paymentDTO.getSuite());
        payment.setZipcode(paymentDTO.getZipcode());

        return payment;
    }

    public static AddressDTO mapAddress(Address address) {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(address.getId());
        addressDTO.setStreet(address.getStreet());
        addressDTO.setCity(address.getCity());
        addressDTO.setState(address.getState().getState());
        addressDTO.setSuite(address.getSuite());
        addressDTO.setZipcode(address.getZipcode());
        addressDTO.setIsPrimary(address.getIsPrimary() == 1);
        addressDTO.setTag(address.getTag());
        addressDTO.setStateID(address.getState().getId());
        return addressDTO;
    }

    public static OrderItemDTO mapOrderItem(OrderItem orderItem) {
        OrderItemDTO orderItemDTO = new OrderItemDTO();

        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setAmount(orderItem.getAmount());
//        orderItemDTO.setImage(orderItem.getItemType().getItem().getImages().get(0).getUrl());
        orderItemDTO.setItemTypeID(orderItem.getItemType().getId());
        orderItemDTO.setItemTypeName(orderItem.getItemType().getName());
        orderItemDTO.setProductID(orderItem.getItemType().getItem().getId());
        orderItemDTO.setProductName(orderItem.getItemType().getItem().getName());

        User user = orderItem.getItemType().getItem().getRetailer();

        orderItemDTO.setRetailerID(user.getId());
        orderItemDTO.setRetailerName(user.getFirstname() + " " + user.getLastname());
        orderItemDTO.setUnitPrice(orderItem.getUnitPrice());

        return orderItemDTO;
    }

    public static OrderDTO mapOrder(Order order) {

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderID(order.getId());
        orderDTO.setAddress(MapUtility.mapAddress(order.getAddress()));
        orderDTO.setPayment(MapUtility.mapPayment(order.getPayment()));
        orderDTO.setHandling(order.getHandling());
        orderDTO.setTax(order.getTax());
        orderDTO.setSubtotal(order.getSubtotal());
        orderDTO.setTotal(order.getTotal());
        orderDTO.setStatus(order.getStatus().getStatus());
        orderDTO.setDate(Integer.toString(order.getCreateTime().getDate()));
        orderDTO.setMonth(Integer.toString(order.getCreateTime().getMonth() + 1));
        orderDTO.setYear(Integer.toString(order.getCreateTime().getYear()));


        List<OrderItemDTO> mappedItems = new ArrayList<>();
        List<OrderItem> items = order.getOrderItems();
        for (OrderItem item : items) {
            OrderItemDTO mappedItem = MapUtility.mapOrderItem(item);
            mappedItems.add(mappedItem);
        }

        orderDTO.setItems(mappedItems);

        return orderDTO;
    }
}
