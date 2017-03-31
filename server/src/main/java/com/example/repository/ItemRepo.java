package com.example.repository;

import com.example.model.business.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 2/28/2017.
 */
@Repository
public interface ItemRepo extends PagingAndSortingRepository<Item, Long> {

    List<Item> findAll();

    Page<Item> findAllByCategoryId(Integer id, Pageable pageable);

    Optional<Item> findById(Long id);
}
