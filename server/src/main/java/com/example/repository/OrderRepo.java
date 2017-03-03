package com.example.repository;

import com.example.model.user.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */
@Repository
public interface OrderRepo extends CrudRepository<Order, Long> {
    List<Order> findAll();
}
