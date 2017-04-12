package com.example.model.user.profile;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Malloy on 2/28/2017.
 */
@Entity
@Table(name = "role")
public class Role {

    @Id
    @Column(name = "id",insertable = false,updatable = false)
    private Long id;

    @Column(name="role",insertable = false,updatable = false)
    private String name;

    @ManyToMany(mappedBy = "roles",fetch = FetchType.LAZY)

    private Set<User> users=new HashSet<User>();

    public Role() {
    }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Role(long id, String name, Set<User> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    @JsonIgnore
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }


//    @Override
//    public String toString() {
//        return "Role{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
//                ", users=" + users +
//                '}';
//    }
}
