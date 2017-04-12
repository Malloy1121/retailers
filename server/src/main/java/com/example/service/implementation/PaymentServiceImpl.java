package com.example.service.implementation;

import com.example.dto.user.PaymentDTO;
import com.example.model.user.profile.Payment;
import com.example.model.business.State;
import com.example.model.user.profile.User;
import com.example.repository.PaymentRepo;
import com.example.service.PaymentService;
import com.example.utility.MapUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Malloy on 3/27/2017.
 */

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepo paymentRepo;

    @Override
    public List<PaymentDTO> getUserPayments(Long userID) {
        List<Payment> payments = this.paymentRepo.findAllByUserId(userID);
        List<PaymentDTO> mappedPayments = new ArrayList<>();

        for (Payment payment : payments) {
            PaymentDTO paymentDTO = MapUtility.mapPayment(payment);

            mappedPayments.add(paymentDTO);
        }

        return mappedPayments;
    }

    @Override
    public boolean addPaymentMethod(PaymentDTO paymentDTO, Long userID) {
        Payment payment =MapUtility.mapPaymentDTO(paymentDTO);

        int count = this.paymentRepo.countAllByUserId(userID);
        count = count == 0 ? 1 : 0;
        payment.setIsPrimary(count);
        User user = new User();
        user.setId(userID);
        payment.setUser(user);

        return this.paymentRepo.save(payment) != null;
    }

    @Transactional
    @Override
    public boolean updatePaymentMethod(PaymentDTO paymentDTO, Long userID) {
        long id = paymentDTO.getId();
        String name = paymentDTO.getName();
        int month = paymentDTO.getMonth();
        int year = paymentDTO.getYear();
        String street = paymentDTO.getStreet();
        String suite = paymentDTO.getSuite();
        String city = paymentDTO.getCity();
        int zipcode = paymentDTO.getZipcode();
        State state = new State();
        state.setId(paymentDTO.getStateID());

        int result = this.paymentRepo.updatePayment(id, name, month, year, street, suite, city, state, zipcode);

        return result == 1;
    }

    @Override
    public boolean deletePaymentMethod(Long id) {
        this.paymentRepo.delete(id);
        return this.paymentRepo.findOne(id) == null;
    }

    @Transactional
    @Override
    public boolean setPaymentToDefault(PaymentDTO paymentDTO, Long userID) {
        System.out.println("Set Address primary: " + paymentDTO);
        this.paymentRepo.setDefaultToFalse(userID, 0, 1);
        this.paymentRepo.updateDefault(1, paymentDTO.getId());
        return true;
    }
}
