package com.example.service;

import com.example.dto.AddressDTO;
import com.example.model.user.Address;
import com.example.model.user.State;

import java.util.List;

/**
 * Created by Malloy on 3/3/2017.
 */
public interface AddressService {

    List<AddressDTO> findAddressByUser(long id);

    boolean addNewAddress(AddressDTO address,long userID);

    boolean updateAddress(AddressDTO address);

    boolean deleteAddress(long id);

    List<State> findAllStates();
}
