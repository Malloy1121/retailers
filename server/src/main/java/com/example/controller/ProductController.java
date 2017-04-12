package com.example.controller;

import com.example.dto.*;
import com.example.dto.business.ItemDTO;
import com.example.dto.business.KeywordCollection;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Created by Malloy on 3/29/2017.
 */
@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    Log log = LogFactory.getLog(this.getClass().getName());

    @GetMapping("/getAllCategories")
    public ResponseMessage getAllCategories() {
        ResponseMessage message = new ResponseMessage();
        message.setResult(true);
        message.setObject(this.productService.getAllCategories());
        return message;
    }

    @GetMapping("/getProductsByCategory/{categoryID}/{page}")
    public ResponseMessage getProductsByCategory(
            @PathVariable Integer categoryID,
            @PathVariable Integer page,
            @RequestParam(name = "lowestPrice") float lowestPrice,
            @RequestParam(name = "highestPrice") float highestPrice
    ) {
        if (lowestPrice == -1) {
            lowestPrice = -1;
        }
        if (highestPrice == -1) {
            highestPrice = Integer.MAX_VALUE;
        }
        ResponseMessage message = new ResponseMessage();
        message.setResult(true);
        message.setObject(this.productService.getItemsByCategory(categoryID, page, 0, lowestPrice, highestPrice));
        return message;
    }

    @PostMapping("/getProductsByCategoryAndKeywords/{categoryID}/{page}")
    public ResponseMessage getProductsByCategoryAndKeywords(
            @PathVariable Integer categoryID,
            @PathVariable Integer page,
            @RequestBody List<KeywordCollection> keys,
            @RequestParam(name = "lowestPrice") float lowestPrice,
            @RequestParam(name = "highestPrice") float highestPrice
    ) {

        if (lowestPrice == -1) {
            lowestPrice = -1;
        }
        if (highestPrice == -1) {
            highestPrice = Integer.MAX_VALUE;
        }
        ResponseMessage message = new ResponseMessage();
        List<String> keywords = new ArrayList<>();
        for (KeywordCollection keywordCollection : keys) {
            keywords.add(keywordCollection.getKeyword());
        }
        System.out.println("keywords: " + keywords.size());
        message.setObject(this.productService.getItemsByCategoryAndKeywords(categoryID, keywords, page, 0, lowestPrice, highestPrice));
        message.setResult(true);
        return message;
    }

    @PostMapping("/getProductsByKeywords")
    public ResponseMessage getProductsByKeywords(@RequestBody KeywordCollection keywordCollection) {
        ResponseMessage message = new ResponseMessage();
        message.setObject(this.productService.findItemNamesByKeyword(keywordCollection.getKeyword()));
        message.setResult(true);
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

    @PostMapping("/getProductsByPriceOrder/{categoryID}/{order}")
    public ResponseMessage getProductsByPriceOrder(
            @PathVariable Integer categoryID,
            @PathVariable Integer order,
            @RequestBody List<KeywordCollection> keys,
            @RequestParam(name = "lowestPrice") float lowestPrice,
            @RequestParam(name = "highestPrice") float highestPrice
    ) {

        log.debug(keys);
        if (lowestPrice == -1) {
            lowestPrice = -1;
        }
        if (highestPrice == -1) {
            highestPrice = Integer.MAX_VALUE;
        }
        ResponseMessage message = new ResponseMessage();
        List<String> keywords = new ArrayList<>();
        for (KeywordCollection keywordCollection : keys) {
            keywords.add(keywordCollection.getKeyword());
            log.info(keywordCollection.getKeyword());
        }
        message.setObject(this.productService.getItemsByCategoryAndKeywords(categoryID, keywords, 0, order, lowestPrice, highestPrice));
        message.setResult(true);
        return message;
    }
}
