package com.example.model.business;

import com.example.model.user.User;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */
@Entity
@Table(name = "item")
public class Item {


    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne()
    @JoinColumn(name = "retailerID")
    private User retailer;

    @OneToMany(mappedBy = "item", fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    private List<ItemImage> images;

    @Column(name = "description")
    private String description;

    @Column(name = "brief_description")
    private String briefDescription;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryID")
    private Category category;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    private List<ItemDetail> details;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    private List<ItemType> itemType;

    @Column(name = "highest_price")
    private float highestPrice;

    @Column(name = "lowest_price")
    private float lowestPrice;

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<ItemType> getItemType() {
        return itemType;
    }

    public void setItemType(List<ItemType> itemType) {
        this.itemType = itemType;
    }

    public User getRetailer() {
        return retailer;
    }

    public void setRetailer(User retailer) {
        this.retailer = retailer;
    }

    public List<ItemImage> getImages() {
        return images;
    }

    public void setImages(List<ItemImage> images) {
        this.images = images;
    }

    public List<ItemDetail> getDetails() {
        return details;
    }

    public void setDetails(List<ItemDetail> details) {
        this.details = details;
    }

    public String getBriefDescription() {
        return briefDescription;
    }

    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }

    public float getHighestPrice() {
        return highestPrice;
    }

    public void setHighestPrice(float highestPrice) {
        this.highestPrice = highestPrice;
    }

    public float getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(float lowestPrice) {
        this.lowestPrice = lowestPrice;
    }
}
