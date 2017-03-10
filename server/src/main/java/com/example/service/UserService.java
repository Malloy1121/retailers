package com.example.service;

import com.example.dto.AddressDTO;
import com.example.dto.UserDTO;
import com.example.model.user.User;

import java.util.List;
import java.util.Optional;


/**
 * Created by Malloy on 2/28/2017.
 */
public interface UserService {

    boolean signup(User user);

    boolean changePassword(String oldPassword, String newPassword);

    boolean updateProfile(UserDTO user);

    boolean isEmailTaken(String email);

    List<UserDTO> findAllUsers();

    UserDTO findUserByEmail(String email);

    UserDTO getCurrentUser();

}
