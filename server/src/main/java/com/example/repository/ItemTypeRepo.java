package com.example.repository;

import com.example.model.business.ItemType;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 3/29/2017.
 */
public interface ItemTypeRepo extends CrudRepository<ItemType, Long> {

    List<ItemType> findAllByItemId(Long id);

    ItemType findTopByItemIdOrderByUnitPriceAsc(Long id);

    ItemType findTopByItemIdOrderByUnitPriceDesc(Long id);

    Optional<ItemType> findById(Long id);

    @Query("select i.inventory from ItemType i where i.id=:id")
    int findInventoryById(@Param("id") long id);

    @Query("update ItemType i set i.inventory=i.inventory - :amount where i.id=:id")
    @Modifying(clearAutomatically = true)
    void updateInventoryById(@Param("amount") int amount, @Param("id") long id);
}
