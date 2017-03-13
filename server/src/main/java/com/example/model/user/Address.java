package com.example.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by Malloy on 2/28/2017.
 */
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "is_primary")
    private int isPrimary;

    @Column(name = "street")
    private String street;

    @Column(name = "suite")
    private String suite;

    @Column(name = "city")
    private String city;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stateID")
    private State state;

    @ManyToOne()
    @JoinColumn(name = "userID")
    private User user;

    @Column(name = "zip")
    private int zipcode;

    public Address() {
    }

    public Address(String tag, int isPrimary, String street, String suite, String city, State state, User user, int zipcode) {
        this.tag = tag;
        this.isPrimary = isPrimary;
        this.street = street;
        this.suite = suite;
        this.city = city;
        this.state = state;
        this.user = user;
        this.zipcode = zipcode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(int isPrimary) {
        this.isPrimary = isPrimary;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getSuite() {
        return suite;
    }

    public void setSuite(String suite) {
        this.suite = suite;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
