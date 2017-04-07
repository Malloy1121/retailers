package com.example.repository;

import com.example.model.user.Address;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Malloy on 3/3/2017.
 */
@Repository
public interface AddressRepo extends CrudRepository<Address, Long> {

    List<Address> findAllByUserId(long id);

    int countAllByUserId(Long userID);

    @Modifying(clearAutomatically = true)
    @Query("update Address a set a.isPrimary=:isDefault where a.id=:id")
    void updateDefault(@Param("isDefault") int isDefault, @Param("id") long id);

    @Modifying(clearAutomatically = true)
    @Query("update Address a set a.isPrimary=:falseFlag where a.user.id=:id and a.isPrimary=:trueFlag")
    void setDefaultToFalse(@Param("id") Long userID,@Param("falseFlag") int falseFlag,@Param("trueFlag") int trueFlag);

}
