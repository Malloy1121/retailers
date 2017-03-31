package com.example.controller;

import com.example.dto.CategoryDTO;
import com.example.dto.ItemDTO;
import com.example.dto.PageDTO;
import com.example.dto.ResponseMessage;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Malloy on 3/29/2017.
 */
@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getAllCategories")
    public ResponseMessage getAllCategories() {
        ResponseMessage message = new ResponseMessage();
        message.setResult(true);
        message.setObject(this.productService.getAllCategories());
        return message;
    }

    @GetMapping("/getProductsByCategory/{categoryID}/{page}")
    public ResponseMessage getProductsByCategory(@PathVariable Integer categoryID, @PathVariable Integer page) {
        ResponseMessage message = new ResponseMessage();
        message.setResult(true);
        message.setObject(this.productService.getItemsByCategory(categoryID, page, 0));
        return message;
    }

    @GetMapping("/getProductById/{productID}")
    public ResponseMessage getProductById(@PathVariable Long productID) {
        ResponseMessage message = new ResponseMessage();
        ItemDTO item = this.productService.getItemById(productID);
        message.setResult(item != null);
        message.setObject(item);
        return message;
    }

    @GetMapping("/ifItemExists/{productID}")
    public ResponseMessage ifItemExist(@PathVariable Long productID) {
        ResponseMessage message = new ResponseMessage();
        boolean result = this.productService.ifExist(productID);
        message.setResult(result);
        return message;
    }
}
