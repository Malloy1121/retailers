package com.example.model.user;

import javax.persistence.*;

/**
 * Created by Malloy on 3/1/2017.
 */
@Entity
@Table(name = "order_status")
public class OrderStatus {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "status")
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
