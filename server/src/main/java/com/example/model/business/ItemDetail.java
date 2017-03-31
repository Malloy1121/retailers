package com.example.model.business;

import javax.persistence.*;

/**
 * Created by Malloy on 3/29/2017.
 */
@Entity
@Table(name = "item_detail")
public class ItemDetail {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "detail")
    private String detail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itemID")
    private Item item;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
