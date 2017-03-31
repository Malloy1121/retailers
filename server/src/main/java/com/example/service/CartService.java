package com.example.service;


import com.example.dto.ItemDTO;

/**
 * Created by Malloy on 2/28/2017.
 */
public interface CartService {

    boolean addToCart(ItemDTO items);

    boolean removeFromCart(ItemDTO item);

    boolean updateAmount(ItemDTO item, int amount);
}
