package com.example.repository;

import com.example.model.business.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Malloy on 3/13/2017.
 */
@Repository
public interface StateRepo extends CrudRepository<State,Integer> {

    List<State> findAll();
}
