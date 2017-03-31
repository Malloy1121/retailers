package com.example.service.implementation;

import com.example.dto.*;
import com.example.model.business.Category;
import com.example.model.business.Item;
import com.example.model.business.ItemDetail;
import com.example.model.business.ItemType;
import com.example.model.user.User;
import com.example.repository.CategoryRepo;
import com.example.repository.ItemRepo;
import com.example.repository.ItemTypeRepo;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by Malloy on 3/29/2017.
 */
@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ItemTypeRepo itemTypeRepo;

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepo.findAll();
        List<CategoryDTO> mappedCategories = new ArrayList<>();

        for (Category category : categories) {
            CategoryDTO mappedCategory = new CategoryDTO();
            mappedCategory.setId(category.getId());
            mappedCategory.setName(category.getName());
            mappedCategories.add(mappedCategory);
        }

        return mappedCategories;
    }

    @Override
    public List<ItemDTO> getItemsByCategory(Integer categoryID, int page, int ascending) {
        int size = 15;
        PageRequest request = new PageRequest(page, size);
        Page<Item> items = this.itemRepo.findAllByCategoryId(categoryID, request);
        System.out.println("Total pages:" + items.getTotalPages() + ", Total elements:" + items.getTotalElements());
        List<ItemDTO> mappedItems = new ArrayList<>();
        for (Item item : items) {
            ItemDTO mappedItem = new ItemDTO();

            CategoryDTO categoryDTO = new CategoryDTO();
            Category category = item.getCategory();
            categoryDTO.setId(category.getId());
            categoryDTO.setName(category.getName());
            mappedItem.setCategory(categoryDTO);

            mappedItem.setName(item.getName());
            mappedItem.setDescription(item.getDescription());
            mappedItem.setId(item.getId());
            mappedItem.setBriefDescription(item.getBriefDescription());

            User user = item.getRetailer();
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setFirstname(user.getFirstname());
            userDTO.setLastname(user.getLastname());
            mappedItem.setRetailer(userDTO);

            ItemType itemType = this.itemTypeRepo.findTopByItemIdOrderByUnitPriceAsc(item.getId());
            ItemTypeDTO itemTypeDTO = new ItemTypeDTO();
            itemTypeDTO.setUnitPrice(itemType.getUnitPrice());
            List<ItemTypeDTO> itemTypes = new ArrayList<>();
            itemTypes.add(itemTypeDTO);
            mappedItem.setItemType(itemTypes);

            mappedItems.add(mappedItem);

        }
        return mappedItems;
    }

    @Override
    public ItemDTO getItemById(Long id) {
        Optional<Item> itemDao = this.itemRepo.findById(id);
        if (!itemDao.isPresent()) {
            return null;
        }

        Item item = itemDao.get();

        List<ItemType> itemTypes = item.getItemType();
        List<ItemDetail> itemDetails = item.getDetails();
        List<ItemTypeDTO> mappedItemTypes = new ArrayList<>();
        List<String> mappedItemDetails = new ArrayList<>();

        for (ItemType itemType : itemTypes) {
            ItemTypeDTO itemTypeDTO = new ItemTypeDTO();
            itemTypeDTO.setId(itemType.getId());
            itemTypeDTO.setUnitPrice(itemType.getUnitPrice());
            itemTypeDTO.setInventory(itemType.getInventory());
            itemTypeDTO.setName(itemType.getName());
            mappedItemTypes.add(itemTypeDTO);
        }

        for (ItemDetail itemDetail : itemDetails) {
            mappedItemDetails.add(itemDetail.getDetail());
        }

        ItemDTO mappedItem = new ItemDTO();


        mappedItem.setItemType(mappedItemTypes);
        mappedItem.setDetails(mappedItemDetails);
        mappedItem.setName(item.getName());
        mappedItem.setDescription(item.getDescription());
        mappedItem.setId(item.getId());

        User user = item.getRetailer();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstname(user.getFirstname());
        userDTO.setLastname(user.getLastname());
        mappedItem.setRetailer(userDTO);

        return mappedItem;
    }

    @Override
    public boolean ifExist(Long id) {
        return this.itemRepo.exists(id);
    }
}