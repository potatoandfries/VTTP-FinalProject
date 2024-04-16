package com.commerce.backend.apis;

import com.commerce.backend.model.response.color.ProductColorResponse;
import com.commerce.backend.service.ProductColorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ColorController extends PublicApiController {

    private final ProductColorService productColorService;
    public ColorController(ProductColorService productColorService) {
        this.productColorService = productColorService;
    }


    @GetMapping(path = "/colors")
    public ResponseEntity<List<ProductColorResponse>> getAllColors() {
        List<ProductColorResponse> productColors = productColorService.findAll();
        return new ResponseEntity<>(productColors, HttpStatus.OK);
    }
}
