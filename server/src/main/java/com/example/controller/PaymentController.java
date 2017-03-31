package com.example.controller;

import com.example.dto.PaymentDTO;
import com.example.dto.ResponseMessage;
import com.example.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Malloy on 3/27/2017.
 */
@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/getUserPayments")
    public ResponseMessage getUserPayments(HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long id = (Long) session.getAttribute("userID");
        List<PaymentDTO> result = this.paymentService.getUserPayments(id);
        message.setResult(true);
        message.setObject(result);
        return message;
    }

    @PostMapping("/addPayment")
    public ResponseMessage addPayment(@RequestBody PaymentDTO paymentDTO, HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long id = (Long) session.getAttribute("userID");
        boolean result = this.paymentService.addPaymentMethod(paymentDTO, id);
        message.setResult(result);
        return message;
    }

    @PostMapping("/editPayment")
    public ResponseMessage editPayment(@RequestBody PaymentDTO paymentDTO, HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        Long id = (Long) session.getAttribute("userID");
        boolean result;
        if (paymentDTO.getId() != null) {
            result = this.paymentService.updatePaymentMethod(paymentDTO, id);
        } else {
            result = false;
        }
        message.setResult(result);
        return message;
    }

    @PostMapping("/deletePayment")
    public ResponseMessage deletePayment(@RequestBody PaymentDTO paymentDTO, HttpSession session) {
        ResponseMessage message = new ResponseMessage();
        boolean result;
        if (paymentDTO.getId() != null && paymentDTO.getId() >= 0) {
            result = this.paymentService.deletePaymentMethod(paymentDTO.getId());
        } else {
            result = false;
        }
        message.setResult(result);
        return message;
    }
}
