package com.example.service.implementation;

import com.example.dto.user.AddressDTO;
import com.example.model.user.profile.Address;
import com.example.model.business.State;
import com.example.model.user.profile.User;
import com.example.repository.AddressRepo;
import com.example.repository.StateRepo;
import com.example.service.AddressService;
import com.example.utility.MapUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    public List<AddressDTO> findAddressByUser(Long id) {
        List<Address> addresses = this.addressRepo.findAllByUserId(id);
        List<AddressDTO> mappedAddresses = new ArrayList<>();
        for (Address address : addresses) {
            AddressDTO addressDTO = MapUtility.mapAddress(address);
            mappedAddresses.add(addressDTO);
            System.out.println(addressDTO);
        }
        return mappedAddresses;
    }

    @Override
    public boolean addNewAddress(AddressDTO addressDTO, Long userID) {
//        System.out.println(addressDTO);
        User user = new User();
        Address address = new Address();
        State state = new State();
        state.setId(addressDTO.getStateID());
        user.setId(userID);
        address.setUser(user);
        address.setCity(addressDTO.getCity());

        int count = this.addressRepo.countAllByUserId(userID);
        System.out.println("Address count: "+count);
        count = count == 0 ? 1 : 0;
        address.setIsPrimary(count);
        address.setState(state);
        address.setStreet(addressDTO.getStreet());
        address.setSuite(addressDTO.getSuite());
        address.setTag(addressDTO.getTag());
        address.setZipcode(addressDTO.getZipcode());
        return this.addressRepo.save(address) != null;
    }

    @Transactional
    @Override
    public boolean updateAddress(AddressDTO addressDTO, Long userID) {
        System.out.print(addressDTO);
        Long id = addressDTO.getId();
        Address address = this.addressRepo.findOne(id);
        State state = new State();
        state.setId(addressDTO.getStateID());
        address.setCity(addressDTO.getCity());
        address.setIsPrimary(addressDTO.getIsPrimary() ? 1 : 0);
        address.setState(state);
        address.setStreet(addressDTO.getStreet());
        address.setSuite(addressDTO.getSuite());
        address.setTag(addressDTO.getTag());
        address.setZipcode(addressDTO.getZipcode());
        System.out.println(address);
        return this.addressRepo.save(address) != null;
    }

    @Override
    public boolean deleteAddress(Long id) {
        this.addressRepo.delete(id);
        return this.addressRepo.findOne(id) == null;
    }

    @Override
    public List<State> findAllStates() {
        return this.stateRepo.findAll();
    }

    @Transactional
    @Override
    public boolean setAddressToDefault(AddressDTO addressDTO, Long userID) {
        System.out.println("Set Address primary: "+addressDTO);
        this.addressRepo.setDefaultToFalse(userID, 0, 1);
        this.addressRepo.updateDefault(1, addressDTO.getId());
        return true;
    }
}
