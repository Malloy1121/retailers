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
    private long id;

    @Column(name = "category")
    private String name;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Item> items=new ArrayList<>();
}
