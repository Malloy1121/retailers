package com.example.repository;

import com.example.model.user.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 2/28/2017.
 */
@Repository
public interface OrderRepo extends PagingAndSortingRepository<Order, Long> {

    Page<Order> findAllByUserId(long userID, Pageable pageable);

    Page<Order> findByUserIdAndStatusIdGreaterThanEqualAndStatusIdLessThanEqual(
            long userID,
            int status1,
            int status2,
            Pageable pageable);

    Page<Order> findByUserIdAndStatusIdEquals(
            long userID,
            int status,
            Pageable pageable);

    Optional<Order> findByIdAndUserId(long id, long userID);

}
