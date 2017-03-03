package com.example.dto;

/**
 * Created by Malloy on 2/28/2017.
 */
public class AddressDTO {

    private long id;

    private String street;

    private String suite;

    private String city;

    private String state;

    private int zip;

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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary(boolean primary) {
        isPrimary = primary;
    }

    @Override
    public String toString() {
        return "AddressDTO{" +
                "id=" + id +
                ", street='" + street + '\'' +
                ", suite='" + suite + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip=" + zip +
                ", isPrimary=" + isPrimary +
                '}';
    }
}
