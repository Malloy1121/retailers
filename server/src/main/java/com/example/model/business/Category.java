package com.example.model.business;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;

    @Column(name = "category")
    private String name;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Item> items=new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
