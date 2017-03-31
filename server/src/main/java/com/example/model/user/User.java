package com.example.model.user;

import com.example.validator.FormValidator;
import com.example.validator.SamePassword;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.*;


/**
 * Created by Malloy on 2/28/2017.
 */
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "app_user")
@SamePassword(groups = {FormValidator.class})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", unique = true)
    @NotNull
    @Pattern(regexp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")
    private String email;

    @NotNull
    @Size(min = 6, max = 15, groups = {FormValidator.class})
    @Column(name = "password")
    private String password;


    @Transient
    private String confirmedPassword;

    @Transient
    private String currentPassword;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "firstname")
    private String firstname;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "lastname")
    private String lastname;

    @Column(name = "is_enabled")
    private int isEnabled;

    @Column(name = "create_time", updatable = false, insertable = true)
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date createTime;

    @Column(name = "last_login_time")
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date lastLoginTime;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = {@JoinColumn(name = "userID", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "roleID", referencedColumnName = "id")}
    )
    @Fetch(FetchMode.SUBSELECT)
    private Set<Role> roles = new HashSet<Role>();

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID")
    @Fetch(FetchMode.SUBSELECT)
    private List<Order> orders = new ArrayList<>();

    @PrePersist
    private void prePersist() {
        this.createTime = new Timestamp(System.currentTimeMillis());
        System.out.println("current time: " + this.createTime);
//        this.lastLoginTime = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    private void preUpdate() {
        this.lastLoginTime = new Timestamp(System.currentTimeMillis());
    }

    public User() {
    }

    public User(String email, String password, String firstname, String lastname, Date createTime, Date lastLoginTime) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.createTime = createTime;
        this.lastLoginTime = lastLoginTime;
    }

    public int getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(int isEnabled) {
        this.isEnabled = isEnabled;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", confirmedPassword='" + confirmedPassword + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", isEnabled=" + isEnabled +
                ", createTime=" + createTime +
                ", lastLoginTime=" + lastLoginTime +
                ", roles=" + roles +
                ", orders=" + orders +
                '}';
    }
}
