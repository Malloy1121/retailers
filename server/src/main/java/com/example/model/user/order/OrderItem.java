package com.example.model.user.order;

import com.example.model.business.ItemType;

import javax.persistence.*;

/**
 * Created by Malloy on 4/11/2017.
 */
@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @OneToOne
    @JoinColumn(name = "item_type_id")
    private ItemType itemType;

    @Column(name = "amount")
    private int amount;

    @Column(name = "unit_price")
    private float unitPrice;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
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

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", itemType=" + itemType +
                ", amount=" + amount +
                ", unitPrice=" + unitPrice +
                '}';
    }
}
