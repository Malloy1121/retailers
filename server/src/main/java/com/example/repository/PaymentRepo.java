package com.example.repository;

import com.example.model.user.Payment;
import com.example.model.user.State;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Malloy on 3/27/2017.
 */
@Repository
public interface PaymentRepo extends CrudRepository<Payment, Long> {

    List<Payment> findAllByUserId(Long userID);

    @Modifying(clearAutomatically = true)
    @Query("update Payment p set " +
            "p.month=:month," +
            "p.name=:name," +
            "p.year=:year," +
            "p.state=:state," +
            "p.street=:street," +
            "p.suite=:suite," +
            "p.city=:city," +
            "p.zipcode=:zipcode " +
            "where p.id=:id")
    int updatePayment(@Param("id") Long id,
                      @Param("name") String name,
                      @Param("month") int month,
                      @Param("year") int year,
                      @Param("street") String street,
                      @Param("suite") String suite,
                      @Param("city") String city,
                      @Param("state") State state,
                      @Param("zipcode") int zipcode);
}
