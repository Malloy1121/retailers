package com.example.service.implementation;

import com.example.dto.ResponseMessage;
import com.example.dto.business.CategoryDTO;
import com.example.dto.business.ItemDTO;
import com.example.dto.business.ItemTypeDTO;
import com.example.dto.business.KeywordCollection;
import com.example.dto.user.UserDTO;
import com.example.model.business.Category;
import com.example.model.business.Item;
import com.example.model.business.ItemDetail;
import com.example.model.business.ItemType;
import com.example.model.user.profile.User;
import com.example.repository.CategoryRepo;
import com.example.repository.ItemRepo;
import com.example.repository.ItemTypeRepo;
import com.example.service.ProductService;
import com.example.utility.MapUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

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

    Logger log = Logger.getLogger(this.getClass().getName());

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
    public ResponseMessage getItemsByCategory(
            Integer categoryID,
            int page,
            int ascending,
            float lowestPrice,
            float highestPrice
    ) {

//        System.out.println("Highest: "+highestPrice);
//        System.out.println("Lowest: "+lowestPrice);

        int size = 9;
        PageRequest request = new PageRequest(page, size);
        Page<Item> items;
        System.out.println("Highest: " + highestPrice);
        System.out.println("Lowest: " + lowestPrice);
        if (categoryID >= 0) {
            items = this.itemRepo.findAllByCategoryIdAndLowestPriceGreaterThanEqualAndHighestPriceLessThanEqual(categoryID, lowestPrice, highestPrice, request);
        } else {
            items = this.itemRepo.findAllByLowestPriceGreaterThanEqualAndHighestPriceLessThanEqual(lowestPrice, highestPrice, request);
        }
        System.out.println("Total pages:" + items.getTotalPages() + ", Total elements:" + items.getTotalElements());
        System.out.println("Current page: " + page);
        ResponseMessage message = new ResponseMessage();
        message.setObject(this.mappingItems(items));
        message.setTotalPages(items.getTotalPages());

        return message;
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
            ItemTypeDTO itemTypeDTO = MapUtility.mapItemType(itemType);
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

    @Override
    public List<KeywordCollection> findItemNamesByKeyword(String keyword) {
        PageRequest request = new PageRequest(0, 10);
//        List<String> list1 = new ArrayList<>();
//        list1.add("%" + keyword + "%");
        Page<Item> items = this.itemRepo.findByNameStartingWithIgnoreCase(keyword, request);
//        Page<Item> items = this.itemRepo.findByNameStartingWithIgnoreCase(list1, request);
        List<KeywordCollection> result = new ArrayList<>();
        for (Item item : items) {
            KeywordCollection keywordCollection = new KeywordCollection();
            keywordCollection.setKeyword(item.getName());
            System.out.println(item.getName());
            result.add(keywordCollection);
        }
        return result;
    }

    @Override
    public ResponseMessage getItemsByCategoryAndKeywords(
            Integer categoryID,
            List<String> keywords,
            int page,
            int ascending,
            float lowestPrice,
            float highestPrice
    ) {

        PageRequest request;
        Sort sort;
        if (ascending == 0) {
            request = new PageRequest(page, 9);
        } else if (ascending > 0) {
            sort = new Sort(Sort.Direction.ASC, "lowestPrice");
            request = new PageRequest(page, 9, sort);
        } else if (ascending < 0) {
            sort = new Sort(Sort.Direction.DESC, "lowestPrice");
            request = new PageRequest(page, 9, sort);
        } else {
            request = new PageRequest(page, 9);
        }

        List<String> keys = new ArrayList<>();
        for (String keyword : keywords) {
            keyword = "%" + keyword + "%";
            keys.add(keyword);
        }
        for (String keyword : keys) {
            System.out.println(keyword);
        }

        if (keywords.size() == 0) {
            keys.add("%%");
        }
//        System.out.println("keys: " + keys.size());
        Page<Item> items;
//        System.out.println("key: " + keys.get(0));
        System.out.println("Highest: " + highestPrice);
        System.out.println("Lowest: " + lowestPrice);
        if (categoryID >= 0) {
            items = this.itemRepo.findAllWithinPriceRangeByCategoryID(keys.get(0), categoryID, lowestPrice, highestPrice, request);
        } else {
            items = this.itemRepo.findAllWithinPriceRange(keys.get(0), lowestPrice, highestPrice, request);
        }

        ResponseMessage message = new ResponseMessage();
        message.setObject(this.mappingItems(items));
        message.setTotalPages(items.getTotalPages());

        return message;
    }

    private List<ItemDTO> mappingItems(Page<Item> items) {
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
}
