package com.example.repository;

import com.example.model.user.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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

    @Modifying(clearAutomatically = true)
    @Query("update User u set u.firstname = :firstname, u.lastname=:lastname where u.id = :id")
    void updateProfile(@Param("firstname") String firstname, @Param("lastname") String lastname, @Param("id") Long id);

    @Modifying(clearAutomatically = true)
    @Query("update User u set u.password = :password where u.id = :id")
    void changePassword(@Param("password") String password, @Param("id") Long id);

    @Query("select u.password from User u where u.id = :id")
    String getUserPassword(@Param("id") Long id);

}
