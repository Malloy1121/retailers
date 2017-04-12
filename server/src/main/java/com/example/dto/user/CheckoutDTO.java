package com.example.dto.user;

import java.util.List;

/**
 * Created by Malloy on 4/10/2017.
 */
public class CheckoutDTO {

    private List<CartItemDTO> cartItems;

    private PaymentDTO payment;

    private AddressDTO address;

    public List<CartItemDTO> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemDTO> cartItems) {
        this.cartItems = cartItems;
    }

    public PaymentDTO getPayment() {
        return payment;
    }

    public void setPayment(PaymentDTO payment) {
        this.payment = payment;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "CheckoutDTO{" +
                "cartItems=" + cartItems +
                ", payment=" + payment +
                ", address=" + address +
                '}';
    }
}
