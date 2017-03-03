package com.example.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * Created by Malloy on 2/28/2017.
 */

@Documented
@Target({ElementType.METHOD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SamePasswordImpl.class)
public @interface SamePassword {

    String message()default "Two passwords not same";

    Class<?>[] groups()default {};

    Class<? extends Payload>[] payload() default {};

}
