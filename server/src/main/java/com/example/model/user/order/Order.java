package com.example.model.user.order;

import com.example.model.business.ItemType;
import com.example.model.user.profile.Address;
import com.example.model.user.profile.Payment;
import com.example.model.user.profile.User;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.GregorianCalendar;
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

    @Column(name = "update_time", updatable = true)
    @CreatedDate
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date updateTime;


    @OneToOne
    @JoinColumn(name = "statusID")
    private OrderStatus status;

    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinTable(
            name = "join_order_item_order",
            joinColumns = {@JoinColumn(name = "order_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "order_item_id",referencedColumnName = "id")}
    )
    private List<OrderItem> orderItems;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID")
    private User user;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "addressID", referencedColumnName = "id")
    private Address address;


    @OneToOne
    @JoinColumn(name = "paymentID")
    private Payment payment;

    @Column(name = "total")
    private float total;

    @Column(name = "subtotal")
    private float subtotal;

    @Column(name = "tax")
    private float tax;

    @Column(name = "handling")
    private float handling;

    @PrePersist
    private void preOrderPersist() {
        GregorianCalendar calendar=new GregorianCalendar();
        calendar.getTime();
        this.createTime = new Timestamp(calendar.getTimeInMillis());
    }

    @PreUpdate
    private void preOrderUpdate() {
        this.updateTime = new Timestamp(System.currentTimeMillis());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

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

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public float getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(float subtotal) {
        this.subtotal = subtotal;
    }

    public float getTax() {
        return tax;
    }

    public void setTax(float tax) {
        this.tax = tax;
    }

    public float getHandling() {
        return handling;
    }

    public void setHandling(float handling) {
        this.handling = handling;
    }


    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", status=" + status +
                ", orderItems=" + orderItems +
                ", user=" + user +
                ", address=" + address +
                ", payment=" + payment +
                ", total=" + total +
                ", subtotal=" + subtotal +
                ", tax=" + tax +
                ", handling=" + handling +
                '}';
    }
}
