package com.example.model.user;

import com.example.model.business.Item;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Malloy on 2/28/2017.
 */

@Entity
@Table(name = "user_order")
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "create_time", updatable = false)
    @CreatedDate
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date createTime;


    @OneToOne
    @JoinColumn(name = "statusID")
    private OrderStatus status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "order_item",
            joinColumns = {@JoinColumn(name = "orderID")},
            inverseJoinColumns = {@JoinColumn(name = "itemID")}
    )
    private List<Item> items = new ArrayList<Item>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID")
    private User user;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "addressID",referencedColumnName = "id")
    private Address address;


//    @JsonIgnore()
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
}
