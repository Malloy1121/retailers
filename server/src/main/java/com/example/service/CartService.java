package com.example.service;


import com.example.dto.business.ItemDTO;
import com.example.dto.user.CartItemDTO;

import java.util.Collection;
import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */
public interface CartService {

    List<CartItemDTO> getCartItems(Long userID);

    boolean deleteCartItem(long cartItemID);

    Integer getCartItemAmount(long userID);

    List<CartItemDTO> getWishListItems(long userID);

    boolean clearWishList(Long userID);

    boolean moveAllFromWishListToCart(Long userID, Collection<CartItemDTO> items);

    boolean moveOneFromWishListToCart(Long userID, CartItemDTO wishListItemDTO);

    boolean addToCart(Long userID, CartItemDTO cartItemDTO);

    boolean addToWishList(Long userID, CartItemDTO cartItemDTO);

    boolean removeWishListItem(Long id, Long userID);
}
