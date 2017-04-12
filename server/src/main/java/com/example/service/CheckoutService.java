package com.example.service;

import com.example.dto.user.CartItemDTO;
import com.example.dto.user.CheckoutDTO;

import java.util.List;

/**
 * Created by Malloy on 4/7/2017.
 */
public interface CheckoutService {
    public CheckoutDTO getCheckoutList(long userID);

    public boolean doCheckout(long userID, List<CartItemDTO> cartItems, long paymentID, long addressID);
}
