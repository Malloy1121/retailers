package com.example.service;


import com.example.dto.PaymentDTO;
import java.util.List;

/**
 * Created by Malloy on 3/27/2017.
 */
public interface PaymentService {

    List<PaymentDTO> getUserPayments(Long userID);

    boolean addPaymentMethod(PaymentDTO paymentDTO, Long userID);

    boolean updatePaymentMethod(PaymentDTO paymentDTO, Long userID);

    boolean deletePaymentMethod(Long id);
}
