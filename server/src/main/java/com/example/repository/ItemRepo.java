package com.example.repository;

import com.example.model.business.Item;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Malloy on 2/28/2017.
 */
@Repository
public interface ItemRepo extends PagingAndSortingRepository<Item, Long> {
}
