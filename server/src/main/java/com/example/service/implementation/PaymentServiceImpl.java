package com.example.service.implementation;

import com.example.dto.PaymentDTO;
import com.example.dto.UserDTO;
import com.example.model.user.Payment;
import com.example.model.user.State;
import com.example.model.user.User;
import com.example.repository.PaymentRepo;
import com.example.service.PaymentService;
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
            PaymentDTO paymentDTO = new PaymentDTO();
            paymentDTO.setId(payment.getId());
            paymentDTO.setIsPrimary(payment.getIsPrimary() == 1);
            paymentDTO.setMonth(payment.getMonth());
            paymentDTO.setYear(payment.getYear());
            paymentDTO.setName(payment.getName());
            paymentDTO.setNumber(payment.getNumber());
            paymentDTO.setStreet(payment.getStreet());
            paymentDTO.setCity(payment.getCity());
            paymentDTO.setState(payment.getState().getState());
            paymentDTO.setStateID(payment.getState().getId());
            paymentDTO.setSuite(payment.getSuite());
            paymentDTO.setZipcode(payment.getZipcode());

            mappedPayments.add(paymentDTO);
        }

        return mappedPayments;
    }

    @Override
    public boolean addPaymentMethod(PaymentDTO paymentDTO, Long userID) {
        Payment payment = new Payment();
        payment.setName(paymentDTO.getName());
        payment.setNumber(paymentDTO.getNumber());
        payment.setMonth(paymentDTO.getMonth());
        payment.setYear(paymentDTO.getYear());
        payment.setStreet(paymentDTO.getStreet());
        payment.setCity(paymentDTO.getCity());
        State state = new State();
        state.setId(paymentDTO.getStateID());
        payment.setState(state);
        payment.setSuite(paymentDTO.getSuite());
        payment.setZipcode(paymentDTO.getZipcode());
        payment.setIsPrimary(0);
        User user=new User();
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
}
