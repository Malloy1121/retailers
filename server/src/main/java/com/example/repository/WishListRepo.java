package com.example.repository;

import com.example.model.user.WishListItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 4/3/2017.
 */
@Repository
public interface WishListRepo extends CrudRepository<WishListItem, Long> {

    List<WishListItem> findAllByUserId(Long id);

    void deleteAllByUserId(Long userID);

    Integer countAllByUserId(Long userID);

    void deleteByIdAndUserId(Long id, Long userID);

    Optional<WishListItem> findByUserIdAndItemTypeId(Long userID, Long itemTypeID);
}
