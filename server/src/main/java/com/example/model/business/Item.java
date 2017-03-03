package com.example.model.business;

import javax.persistence.*;

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

    @Column(name = "unit_price")
    private float unitPrice;

    @Column(name = "amount")
    private int amount;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryID")
    private Category category;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
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
}
