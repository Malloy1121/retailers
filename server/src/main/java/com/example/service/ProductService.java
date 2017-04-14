package com.example.service;

import com.example.dto.ResponseMessage;
import com.example.dto.business.CategoryDTO;
import com.example.dto.business.ItemDTO;
import com.example.dto.business.KeywordCollection;

import java.util.List;

/**
 * Created by Malloy on 3/29/2017.
 */
public interface ProductService {

    List<CategoryDTO> getAllCategories();

    ResponseMessage getItemsByCategory(
            Integer categoryID,
            int page,
            int ascending,
            float lowestPrice,
            float highestPrice
    );

    ItemDTO getItemById(Long id);

    boolean ifExist(Long id);

    List<KeywordCollection> findItemNamesByKeyword(String keyword);

    ResponseMessage getItemsByCategoryAndKeywords(
            Integer categoryID,
            List<String> keywords,
            int page,
            int ascending,
            float lowestPrice,
            float highestPrice
    );
}
