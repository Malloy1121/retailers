package com.example.repository;

import com.example.model.business.ItemImage;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Malloy on 3/29/2017.
 */
public interface ItemImageRepo extends CrudRepository<ItemImage,Long> {

    List<ItemImage> findAll();
}
