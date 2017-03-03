package com.example.service;

import com.example.dto.AddressDTO;
import com.example.model.user.Address;

import java.util.List;

/**
 * Created by Malloy on 3/3/2017.
 */
public interface AddressService {

    List<AddressDTO> findAddressByUser(long id);

    boolean addNewAddress(Address address,long userID);

    boolean updateAddress(Address oldAddress, Address newAddress);

    boolean deleteAddress(long id);
}
