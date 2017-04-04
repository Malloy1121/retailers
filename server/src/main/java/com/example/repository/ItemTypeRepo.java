package com.example.repository;

import com.example.model.business.ItemType;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 3/29/2017.
 */
public interface ItemTypeRepo extends CrudRepository<ItemType, Integer> {

    List<ItemType> findAllByItemId(Long id);

    ItemType findTopByItemIdOrderByUnitPriceAsc(Long id);

    ItemType findTopByItemIdOrderByUnitPriceDesc(Long id);

    Optional<ItemType> findById(Long id);
}
