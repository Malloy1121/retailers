package com.example.repository;

import com.example.model.user.order.CartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 4/3/2017.
 */
@Repository
public interface CartRepo extends CrudRepository<CartItem, Long> {

    List<CartItem> findByUserId(Long id);

    Optional<CartItem> findById(Long id);

    Integer countAllByUserId(Long userID);

    Optional<CartItem> findByItemTypeIdAndUserId(Long itemTypeID,Long userID);

    void deleteAllByUserId(long userId);
}
