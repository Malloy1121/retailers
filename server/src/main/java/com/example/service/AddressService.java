package com.example.service;

import com.example.dto.user.AddressDTO;
import com.example.model.business.State;

import java.util.List;

/**
 * Created by Malloy on 3/3/2017.
 */
public interface AddressService {

    List<AddressDTO> findAddressByUser(Long id);

    boolean addNewAddress(AddressDTO address,Long userID);

    boolean updateAddress(AddressDTO address,Long userID);

    boolean deleteAddress(Long id);

    List<State> findAllStates();

    boolean setAddressToDefault(AddressDTO addressDTO,Long userID);
}
