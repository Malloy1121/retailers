package com.example.repository;

import com.example.model.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 2/28/2017.
 */
@Repository
public interface UserRepo extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findAll();
}
