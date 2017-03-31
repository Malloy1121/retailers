package com.example.service;

import com.example.dto.CategoryDTO;
import com.example.dto.ItemDTO;
import com.example.dto.ItemTypeDTO;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by Malloy on 3/29/2017.
 */
public interface ProductService {

    List<CategoryDTO> getAllCategories();

    List<ItemDTO> getItemsByCategory(Integer categoryID, int page, int ascending);

    ItemDTO getItemById(Long id);

    boolean ifExist(Long id);
}
