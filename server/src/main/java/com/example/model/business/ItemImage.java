package com.example.model.business;

import javax.persistence.*;

/**
 * Created by Malloy on 3/29/2017.
 */
@Entity
@Table(name = "item_image")
public class ItemImage {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "itemID")
    private Item item;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
