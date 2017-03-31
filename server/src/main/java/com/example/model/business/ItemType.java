package com.example.model.business;

import javax.persistence.*;

/**
 * Created by Malloy on 3/29/2017.
 */

@Entity
@Table(name = "item_type")
public class ItemType {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "itemID")
    private Item item;

    @Column(name = "name")
    private String name;

    @Column(name = "unit_price")
    private float unitPrice;

    @Column(name = "inventory")
    private Integer inventory;

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
