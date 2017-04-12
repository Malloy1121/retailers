package com.example.dto.business;

import com.example.dto.user.UserDTO;

import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */
public class ItemDTO {

    private Long id;

    private String name;

    private UserDTO retailer;

    private List<String> images;

    private String description;

    private String briefDescription;

    private CategoryDTO category;

    private List<ItemTypeDTO> itemType;

    private List<String> details;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public UserDTO getRetailer() {
        return retailer;
    }

    public void setRetailer(UserDTO retailer) {
        this.retailer = retailer;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<ItemTypeDTO> getItemType() {
        return itemType;
    }

    public void setItemType(List<ItemTypeDTO> itemType) {
        this.itemType = itemType;
    }

    public String getBriefDescription() {
        return briefDescription;
    }

    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }
}
