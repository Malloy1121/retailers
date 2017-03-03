package com.example.service.implementation;

import com.example.dto.AddressDTO;
import com.example.model.user.Address;
import com.example.model.user.User;
import com.example.repository.AddressRepo;
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

    @Override
    public List<AddressDTO> findAddressByUser(long id) {
        List<Address> addresses=this.addressRepo.findAllByUserId(id);
        List<AddressDTO> mappedAddresses=new ArrayList<>();
        for(Address address:addresses){
            AddressDTO addressDTO=new AddressDTO();
            addressDTO.setId(address.getId());
            addressDTO.setStreet(address.getStreet());
            addressDTO.setCity(address.getCity());
            addressDTO.setState(address.getState().getState());
            addressDTO.setSuite(address.getSuite());
            addressDTO.setZip(address.getZipcode());
            addressDTO.setPrimary(address.getIsPrimary()==1);
            mappedAddresses.add(addressDTO);
            System.out.println(addressDTO);
        }
        return mappedAddresses;
    }

    @Override
    public boolean addNewAddress(Address address, long userID) {
        User user=new User();
        user.setId(userID);
        address.setUser(user);
        return this.addressRepo.save(address)!=null;
    }

    @Override
    public boolean updateAddress(Address oldAddress, Address newAddress) {
        return false;
    }

    @Override
    public boolean deleteAddress(long id) {
        this.addressRepo.delete(id);
        return this.addressRepo.findOne(id)==null;
    }
}
