package com.example.model.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Malloy on 3/1/2017.
 */
@Entity
@Table(name = "state")
public class State {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "state")
    private String state;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
