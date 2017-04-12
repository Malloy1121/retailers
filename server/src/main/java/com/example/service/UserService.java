package com.example.service;

import com.example.dto.user.UserDTO;
import com.example.model.user.profile.User;

import java.util.List;


/**
 * Created by Malloy on 2/28/2017.
 */
public interface UserService {

    boolean signup(User user);

    boolean changePassword(String oldPassword, String newPassword, Long id);

    boolean updateProfile(UserDTO user, Long id);

    boolean isEmailTaken(String email);

    List<UserDTO> findAllUsers();

    UserDTO findUserByEmail(String email);

    UserDTO getCurrentUser();

}
