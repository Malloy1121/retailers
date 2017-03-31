package com.example.repository;

import com.example.model.business.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Malloy on 3/29/2017.
 */
@Repository
public interface CategoryRepo extends CrudRepository<Category,Integer>{

    List<Category> findAll();
}
