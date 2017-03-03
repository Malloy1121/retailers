package com.example.handler;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;


/**
 * Created by Malloy on 3/2/2017.
 */
@RestControllerAdvice
@RequestMapping(produces = "application/json")
public class MyHandler {


    @ExceptionHandler(SQLException.class)
    public void handleSqlException(SQLException exception){
        System.out.println("Sql state: "+exception.getSQLState());
        System.out.println("Sql message: "+exception.getMessage());
        System.out.println("Sql next exception: "+exception.getNextException());


    }
}
