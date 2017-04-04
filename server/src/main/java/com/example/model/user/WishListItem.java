package com.example.model.user;

import com.example.model.business.Item;
import com.example.model.business.ItemType;

import javax.persistence.*;

/**
 * Created by Malloy on 4/3/2017.
 */
@Entity
@Table(name = "wish_list_item")
public class WishListItem {

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private User user;

    @OneToOne
    @JoinColumn(name = "itemID")
    private Item item;

    @OneToOne
    @JoinColumn(name = "item_type_id")
    private ItemType itemType;

    @Column(name = "amount")
    private Integer amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
