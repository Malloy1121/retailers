package com.example.service.implementation;

import com.example.dto.CartItemDTO;
import com.example.dto.ItemDTO;
import com.example.dto.OrderDTO;
import com.example.model.business.Item;
import com.example.model.business.ItemType;
import com.example.model.user.CartItem;
import com.example.model.user.Order;
import com.example.model.user.User;
import com.example.model.user.WishListItem;
import com.example.repository.CartRepo;
import com.example.repository.ItemTypeRepo;
import com.example.repository.OrderRepo;
import com.example.repository.WishListRepo;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 3/2/2017.
 */
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private WishListRepo wishListRepo;

    @Autowired
    private ItemTypeRepo itemTypeRepo;

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
    public List<Order> getOrders(Long userID) {
        return this.orderRepo.findAll();
    }

    @Override
    public Order findOrderByID(long id) {
        return null;
    }

    @Override
    public List<CartItemDTO> getCartItems(Long userID) {
        List<CartItem> items = this.cartRepo.findByUserId(userID);
        List<CartItemDTO> mappedItems = new ArrayList<>();
        for (CartItem item : items) {
            CartItemDTO cartItem = new CartItemDTO();
            cartItem.setId(item.getId());
            cartItem.setAmount(item.getAmount());
            cartItem.setProductID(item.getItem().getId());
            cartItem.setProductName(item.getItem().getName());
            cartItem.setItemTypeID(item.getItemType().getId());
            cartItem.setItemTypeName(item.getItemType().getName());
            cartItem.setUnitPrice(item.getItemType().getUnitPrice());
            cartItem.setItemTypeInventory(item.getItemType().getInventory());

            mappedItems.add(cartItem);
        }
        return mappedItems;
    }

    @Override
    public boolean deleteCartItem(long cartItemID) {
        this.cartRepo.delete(cartItemID);
        return !this.cartRepo.findById(cartItemID).isPresent();
    }

    @Override
    public Integer getCartItemAmount(long userID) {
        return this.cartRepo.countAllByUserId(userID);
    }

    @Override
    public List<CartItemDTO> getWishListItems(long userID) {
        List<CartItemDTO> mappedItems = new ArrayList<>();
        List<WishListItem> items = this.wishListRepo.findAllByUserId(userID);
        for (WishListItem item : items) {
            CartItemDTO mappedItem = new CartItemDTO();
            mappedItem.setId(item.getId());
            mappedItem.setProductID(item.getItem().getId());
            mappedItem.setProductName(item.getItem().getName());
            mappedItem.setAmount(item.getAmount());
            ItemType itemType = item.getItemType();

            mappedItem.setItemTypeName(itemType.getName());
            mappedItem.setItemTypeInventory(itemType.getInventory());
            mappedItem.setItemTypeID(itemType.getId());
            mappedItem.setUnitPrice(itemType.getUnitPrice());

            mappedItems.add(mappedItem);
        }
        return mappedItems;
    }

    @Transactional
    @Override
    public boolean clearWishList(Long userID) {

        this.wishListRepo.deleteAllByUserId(userID);

        return true;
    }

    @Transactional
    @Override
    public boolean moveAllFromWishListToCart(Long userID, Collection<CartItemDTO> items) {
        if (items.size() == 0) {
            return true;
        }
        for (CartItemDTO item : items) {
            this.moveOneFromWishListToCart(userID, item);
        }
        return this.wishListRepo.countAllByUserId(userID) == 0;
    }

    @Transactional
    @Override
    public boolean moveOneFromWishListToCart(Long userID, CartItemDTO wishListItemDTO) {
        System.out.println(wishListItemDTO.getId());
        WishListItem wishListItem = this.wishListRepo.findOne(wishListItemDTO.getId());
        Optional<CartItem> cartItemOptional = this.cartRepo.findByItemTypeIdAndUserId(wishListItem.getItemType().getId(), userID);
        if (!cartItemOptional.isPresent()) {
            CartItem cartItem = new CartItem();
            cartItem.setAmount(wishListItem.getAmount());

            User user = new User();
            user.setId(userID);
            cartItem.setUser(user);

            Item item = new Item();
            item.setId(wishListItem.getItem().getId());
            cartItem.setItem(item);

            ItemType itemType = new ItemType();
            itemType.setId(wishListItem.getItemType().getId());
            cartItem.setItemType(itemType);

            this.cartRepo.save(cartItem);
        } else {
            CartItem cartItem = cartItemOptional.get();
            cartItem.setAmount(cartItem.getAmount() + wishListItemDTO.getAmount());
            this.cartRepo.save(cartItem);
        }

        this.wishListRepo.delete(wishListItem.getId());
        return true;
    }

    @Transactional
    @Override
    public boolean addToCart(Long userID, CartItemDTO cartItemDTO) {
        Optional<CartItem> cartItemOptional = this.cartRepo.findByItemTypeIdAndUserId(cartItemDTO.getItemTypeID(), userID);
        CartItem cartItem = new CartItem();

        if (!cartItemOptional.isPresent()) {
            User user = new User();
            user.setId(userID);
            cartItem.setUser(user);

            ItemType itemType = new ItemType();
            itemType.setId(cartItemDTO.getItemTypeID());
            cartItem.setItemType(itemType);

            Item item = new Item();
            item.setId(cartItemDTO.getProductID());
            cartItem.setItem(item);

            cartItem.setAmount(cartItemDTO.getAmount());
        } else {
            cartItem = cartItemOptional.get();
            cartItem.setAmount(cartItem.getAmount() + cartItemDTO.getAmount());
        }

        return this.cartRepo.save(cartItem) != null;
    }

    @Transactional
    @Override
    public boolean addToWishList(Long userID, CartItemDTO cartItemDTO) {
        Optional<WishListItem> wishListItemOptional = this.wishListRepo.findByUserIdAndItemTypeId(userID, cartItemDTO.getItemTypeID());
        if (wishListItemOptional.isPresent()) {
            return true;
        }
        WishListItem wishListItem = new WishListItem();
        User user = new User();
        user.setId(userID);
        wishListItem.setUser(user);

        ItemType itemType = new ItemType();
        itemType.setId(cartItemDTO.getItemTypeID());
        wishListItem.setItemType(itemType);

        Item item = new Item();
        item.setId(cartItemDTO.getProductID());
        wishListItem.setItem(item);
        wishListItem.setAmount(cartItemDTO.getAmount());

        return this.wishListRepo.save(wishListItem) != null;
    }

    @Transactional
    @Override
    public boolean removeWishListItem(Long id, Long userID) {
        this.wishListRepo.deleteByIdAndUserId(id, userID);
        return true;
    }
}
