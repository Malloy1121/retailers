package com.example.dto.user;

import com.example.dto.business.ItemTypeDTO;

/**
 * Created by Malloy on 4/11/2017.
 */
public class OrderItemDTO {

    private long id;

    private long orderID;

    private int amount;

    private float unitPrice;

    private Long productID;

    private String productName;

    private String image;

    private Long itemTypeID;

    private String itemTypeName;

    private String retailerName;

    private Long retailerID;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOrderID() {
        return orderID;
    }

    public void setOrderID(long orderID) {
        this.orderID = orderID;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getItemTypeID() {
        return itemTypeID;
    }

    public void setItemTypeID(Long itemTypeID) {
        this.itemTypeID = itemTypeID;
    }

    public String getItemTypeName() {
        return itemTypeName;
    }

    public void setItemTypeName(String itemTypeName) {
        this.itemTypeName = itemTypeName;
    }

    public String getRetailerName() {
        return retailerName;
    }

    public void setRetailerName(String retailerName) {
        this.retailerName = retailerName;
    }

    public Long getRetailerID() {
        return retailerID;
    }

    public void setRetailerID(Long retailerID) {
        this.retailerID = retailerID;
    }
}
