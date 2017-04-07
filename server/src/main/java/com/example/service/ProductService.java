package com.example.service;

import com.example.dto.CategoryDTO;
import com.example.dto.ItemDTO;
import com.example.dto.ItemTypeDTO;
import com.example.dto.KeywordCollection;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by Malloy on 3/29/2017.
 */
public interface ProductService {

    List<CategoryDTO> getAllCategories();

    List<ItemDTO> getItemsByCategory(
            Integer categoryID,
            int page,
            int ascending,
            float lowestPrice,
            float highestPrice
    );

    ItemDTO getItemById(Long id);

    boolean ifExist(Long id);

    List<KeywordCollection> findItemNamesByKeyword(String keyword);

    List<ItemDTO> getItemsByCategoryAndKeywords(
            Integer categoryID,
            List<String> keywords,
            int page,
            int ascending,
            float lowestPrice,
            float highestPrice
    );
}
