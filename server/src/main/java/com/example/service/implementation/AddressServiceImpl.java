package com.example.service.implementation;

import com.example.dto.AddressDTO;
import com.example.model.user.Address;
import com.example.model.user.State;
import com.example.model.user.User;
import com.example.repository.AddressRepo;
import com.example.repository.StateRepo;
import com.example.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Malloy on 3/3/2017.
 */
@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private StateRepo stateRepo;

    @Override
    public List<AddressDTO> findAddressByUser(long id) {
        List<Address> addresses = this.addressRepo.findAllByUserId(id);
        List<AddressDTO> mappedAddresses = new ArrayList<>();
        for (Address address : addresses) {
            AddressDTO addressDTO = new AddressDTO();
            addressDTO.setId(address.getId());
            addressDTO.setStreet(address.getStreet());
            addressDTO.setCity(address.getCity());
            addressDTO.setState(address.getState().getState());
            addressDTO.setSuite(address.getSuite());
            addressDTO.setZip(address.getZipcode());
            addressDTO.setIsPrimary(address.getIsPrimary() == 1);
            mappedAddresses.add(addressDTO);
            System.out.println(addressDTO);
        }
        return mappedAddresses;
    }

    @Override
    public boolean addNewAddress(AddressDTO addressDTO, long userID) {
        User user = new User();
        Address address = new Address();
        State state = new State();
        state.setId(addressDTO.getStateID());
        user.setId(userID);
        address.setUser(user);
        address.setCity(addressDTO.getCity());
        address.setIsPrimary(0);
        address.setState(state);
        address.setStreet(addressDTO.getStreet());
        address.setSuite(addressDTO.getSuite());
        address.setTag(addressDTO.getTag());
        address.setZipcode(addressDTO.getZip());
        return this.addressRepo.save(address) != null;
    }

    @Override
    public boolean updateAddress(AddressDTO addressDTO) {
        Address address = new Address();
        State state = new State();
        state.setId(addressDTO.getStateID());
        address.setCity(addressDTO.getCity());
        address.setId(addressDTO.getId());
        address.setIsPrimary(addressDTO.getIsPrimary() ? 1 : 0);
        address.setState(state);
        address.setStreet(addressDTO.getStreet());
        address.setSuite(addressDTO.getSuite());
        address.setTag(addressDTO.getTag());
        address.setZipcode(addressDTO.getZip());
        return this.addressRepo.save(address) != null;
    }

    @Override
    public boolean deleteAddress(long id) {
        this.addressRepo.delete(id);
        return this.addressRepo.findOne(id) == null;
    }

    @Override
    public List<State> findAllStates() {
        return this.stateRepo.findAll();
    }
}
