package com.example.repository;

import com.example.model.business.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 2/28/2017.
 */
@Repository
public interface ItemRepo extends PagingAndSortingRepository<Item, Long> {

    Page<Item> findAllByLowestPriceGreaterThanEqualAndHighestPriceLessThanEqual(
            float lowestPrice,
            float highestPrice,
            Pageable pageable
    );

    Page<Item> findAllByCategoryIdAndLowestPriceGreaterThanEqualAndHighestPriceLessThanEqual(
            Integer id,
            float lowestPrice,
            float highestPrice,
            Pageable pageable
    );

    Optional<Item> findById(Long id);

    Page<Item> findByNameStartingWithIgnoreCase(String name, Pageable pageable);

    Page<Item> findByNameLikeIgnoreCase(String name, Pageable pageable);


    @Query("select i from Item i where " +
            "i.name like :name and " +
            " ((i.lowestPrice >= :lowestPrice and i.lowestPrice <= :highestPrice) or" +
            "(i.highestPrice >= :lowestPrice and i.highestPrice <= :highestPrice))")
    Page<Item> findAllWithinPriceRange(
            @Param("name") String name,
            @Param("lowestPrice") float lowestPrice,
            @Param("highestPrice") float highestPrice,
            Pageable pageable);

    Page<Item> findByNameLikeIgnoreCaseAndCategoryId(String name, Integer categoryId, Pageable pageable);

    @Query("select i from Item i where " +
            "i.name like :name and " +
            "i.category.id=:categoryID and" +
            " ((i.lowestPrice >= :lowestPrice and i.lowestPrice <= :highestPrice) or" +
            "(i.highestPrice >= :lowestPrice and i.highestPrice <= :highestPrice))")
    Page<Item> findAllWithinPriceRangeByCategoryID(
            @Param("name") String name,
            @Param("categoryID") Integer categoryId,
            @Param("lowestPrice") float lowestPrice,
            @Param("highestPrice") float highestPrice,
            Pageable pageable);
//    Page<Item> findDistinctByIdIsNot

}
