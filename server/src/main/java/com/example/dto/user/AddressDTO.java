package com.example.dto.user;

/**
 * Created by Malloy on 2/28/2017.
 */
public class AddressDTO {

    private long id;

    private String tag;

    private String street;

    private String suite;

    private String city;

    private String state;

    private int stateID;

    private int zipcode;

    private boolean isPrimary;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public int getStateID() {
        return stateID;
    }

    public void setStateID(int stateID) {
        this.stateID = stateID;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(boolean isPrimary) {
        this.isPrimary = isPrimary;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "AddressDTO{" +
                "id=" + id +
                ", tag='" + tag + '\'' +
                ", street='" + street + '\'' +
                ", suite='" + suite + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", stateID=" + stateID +
                ", zipcode=" + zipcode +
                ", isPrimary=" + isPrimary +
                '}';
    }
}
