package com.example.service.implementation;

import com.example.dto.user.AddressDTO;
import com.example.dto.user.CartItemDTO;
import com.example.dto.user.CheckoutDTO;
import com.example.dto.user.PaymentDTO;
import com.example.model.business.ItemType;
import com.example.model.user.order.Order;
import com.example.model.user.order.OrderItem;
import com.example.model.user.order.OrderStatus;
import com.example.model.user.profile.Address;
import com.example.model.user.profile.Payment;
import com.example.model.user.profile.User;
import com.example.repository.*;
import com.example.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 4/10/2017.
 */
@Service
public class CheckoutServiceImpl implements CheckoutService {
    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ItemTypeRepo itemTypeRepo;


    @Override
    public CheckoutDTO getCheckoutList(long userID) {
        CheckoutDTO checkoutDTO = new CheckoutDTO();
        PaymentDTO paymentDTO = new PaymentDTO();
        AddressDTO addressDTO = new AddressDTO();

        Optional<Payment> paymentOptional = this.paymentRepo.findByUserIdAndIsPrimary(userID, 1);
        Optional<Address> addressOptional = this.addressRepo.findByUserIdAndIsPrimary(userID, 1);

        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            paymentDTO.setId(payment.getId());
            paymentDTO.setName(payment.getName());
            paymentDTO.setNumber(payment.getNumber());
            paymentDTO.setStreet(payment.getStreet());
            paymentDTO.setCity(payment.getCity());
            paymentDTO.setStateID(payment.getState().getId());
            paymentDTO.setState(payment.getState().getState());
            paymentDTO.setSuite(payment.getSuite());
            paymentDTO.setYear(payment.getYear());
            paymentDTO.setZipcode(payment.getZipcode());
            paymentDTO.setMonth(payment.getMonth());
        } else {
            paymentDTO.setId(new Long(-1));
        }

        if (addressOptional.isPresent()) {
            Address address = addressOptional.get();
            addressDTO.setId(address.getId());
            addressDTO.setTag(address.getTag());
            addressDTO.setStreet(address.getStreet());
            addressDTO.setSuite(address.getSuite());
            addressDTO.setCity(address.getCity());
            addressDTO.setStateID(address.getState().getId());
            addressDTO.setState(address.getState().getState());
            addressDTO.setZipcode(address.getZipcode());
        } else {
            addressDTO.setId(new Long(-1));
        }

        checkoutDTO.setAddress(addressDTO);
        checkoutDTO.setPayment(paymentDTO);

        return checkoutDTO;
    }

    @Transactional
    @Override
    public boolean doCheckout(
            long userID,
            List<CartItemDTO> cartItems,
            long paymentID,
            long addressID
    ) {
        Order order = new Order();

        User user = new User();
        user.setId(userID);
        order.setUser(user);

        OrderStatus status = new OrderStatus();
        status.setId(1);
        order.setStatus(status);

        Payment payment = new Payment();
        payment.setId(paymentID);
        order.setPayment(payment);

        Address address = new Address();
        address.setId(addressID);
        order.setAddress(address);

        order.setHandling(2);
        order.setTax(2);

        float subtotal = 0;

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItemDTO cartItemDTO : cartItems) {
            OrderItem orderItem = new OrderItem();
            ItemType itemType = this.itemTypeRepo.findOne(cartItemDTO.getItemTypeID());


            int inventory = itemType.getInventory();

            if (cartItemDTO.getAmount() > inventory) {
                return false;
            }

            orderItem.setAmount(cartItemDTO.getAmount());
            orderItem.setItemType(itemType);
            orderItem.setUnitPrice(cartItemDTO.getUnitPrice());

            subtotal += cartItemDTO.getUnitPrice() * cartItemDTO.getAmount();

            this.itemTypeRepo.updateInventoryById(cartItemDTO.getAmount(), itemType.getId());

            orderItems.add(orderItem);
            System.out.println("deleting cart item id: `" + cartItemDTO.getId());
//            this.cartRepo.delete(cartItemDTO.getId());
        }

        order.setSubtotal(subtotal);
        order.setTotal(subtotal + 4);
        order.setOrderItems(orderItems);

        this.cartRepo.deleteAllByUserId(userID);

        this.orderRepo.save(order);

        return true;
    }
}
