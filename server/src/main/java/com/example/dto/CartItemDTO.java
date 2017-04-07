package com.example.dto;

/**
 * Created by Malloy on 4/3/2017.
 */
public class CartItemDTO {

    private Long id;

    private Long productID;

    private Integer amount;

    private String productName;

    private String image;

    private float unitPrice;

    private Long itemTypeID;

    private String itemTypeName;

    private int itemTypeInventory;

    private String retailerName;

    private Long retailerID;

    public Long getRetailerID() {
        return retailerID;
    }

    public void setRetailerID(Long retailerID) {
        this.retailerID = retailerID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getItemTypeInventory() {
        return itemTypeInventory;
    }

    public void setItemTypeInventory(int itemTypeInventory) {
        this.itemTypeInventory = itemTypeInventory;
    }

    public String getItemTypeName() {
        return itemTypeName;
    }

    public void setItemTypeName(String itemTypeName) {
        this.itemTypeName = itemTypeName;
    }

    public Long getItemTypeID() {
        return itemTypeID;
    }

    public void setItemTypeID(Long itemTypeID) {
        this.itemTypeID = itemTypeID;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
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

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getRetailerName() {
        return retailerName;
    }

    public void setRetailerName(String retailerName) {
        this.retailerName = retailerName;
    }
}
