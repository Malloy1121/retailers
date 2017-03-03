package com.example.validator;

import com.example.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Created by Malloy on 2/28/2017.
 */
public class SamePasswordImpl implements ConstraintValidator<SamePassword, User> {


    @Override
    public void initialize(SamePassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        System.out.println(user.getPassword()+"; "+user.getConfirmedPassword());
        return user.getPassword().equals(user.getConfirmedPassword());
    }
}
