package com.example.repository;

import com.example.model.user.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Malloy on 3/3/2017.
 */
@Repository
public interface AddressRepo extends CrudRepository<Address,Long> {

    List<Address> findAllByUserId(long id);

}
