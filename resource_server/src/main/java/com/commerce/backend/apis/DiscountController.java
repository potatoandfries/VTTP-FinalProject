package com.commerce.backend.apis;

import com.commerce.backend.model.request.discount.ApplyDiscountRequest;
import com.commerce.backend.service.DiscountService;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DiscountController extends ApiController {

    private final DiscountService discountService;
    public DiscountController(DiscountService discountService) {
        this.discountService = discountService;
    }

    @PostMapping(path = "/cart/discount")
    public ResponseEntity<HttpStatus> applyDiscount(@RequestBody @Valid ApplyDiscountRequest applyDiscountRequest) {
        discountService.applyDiscount(applyDiscountRequest.getCode());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
