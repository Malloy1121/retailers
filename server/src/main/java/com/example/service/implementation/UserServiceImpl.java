package com.example.service.implementation;

import com.example.dto.AddressDTO;
import com.example.dto.UserDTO;
import com.example.model.user.Role;
import com.example.model.user.User;
import com.example.repository.UserRepo;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by Malloy on 2/28/2017.
 */
@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public boolean signup(User user) {
        String password = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(password);
        Set<Role> roles = user.getRoles();
        Role userRole = new Role();
        userRole.setId(new Long(1));
        roles.add(userRole);
        user.setRoles(roles);
        user.setIsEnabled(1);
        return this.userRepo.save(user) != null;
    }

    @Override
    public boolean changePassword(String oldPassword, String newPassword) {
        return false;
    }

    @Override
    public boolean updateProfile(UserDTO user) {
        return false;
    }

    @Override
    public boolean isEmailTaken(String email) {
        return this.userRepo.findByEmail(email).isPresent();
    }

    @Override
    public List<UserDTO> findAllUsers() {
        List<UserDTO> mappedUsers=new ArrayList<>();
        List<User> users=this.userRepo.findAll();
        for(User user:users){
            UserDTO userDTO=new UserDTO();
            userDTO.setEmail(user.getEmail());
            userDTO.setId(user.getId());
            userDTO.setFirstname(user.getFirstname());
            userDTO.setLastname(user.getLastname());

            Set<String> mappedRoles=new HashSet<>();
            for(Role role:user.getRoles()){
                mappedRoles.add(role.getName());
            }
            userDTO.setRoles(mappedRoles);
        }
        return mappedUsers;
    }

    @Override
    public User findUserByEmail(String email) {
        return this.userRepo.findByEmail(email).orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = this.userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
        return new UserDetailsImpl(user);
    }
}
