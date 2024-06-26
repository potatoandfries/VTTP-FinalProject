package com.commerce.backend.apis;

import com.commerce.backend.error.exception.InvalidArgumentException;
import com.commerce.backend.model.request.order.PostOrderRequest;
import com.commerce.backend.model.response.order.OrderResponse;
import com.commerce.backend.service.OrderService;

import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class OrderController extends ApiController {

    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(path = "/order/count")
    public ResponseEntity<Integer> getAllOrdersCount() {
        Integer orderCount = orderService.getAllOrdersCount();
        return new ResponseEntity<>(orderCount, HttpStatus.OK);
    }

    @GetMapping(path = "/order")
    public ResponseEntity<List<OrderResponse>> getAllOrders(@RequestParam("page") Integer page, @RequestParam("size") Integer pageSize) {
        if (Objects.isNull(page) || page < 0) {
            throw new InvalidArgumentException("Invalid page");
        }
        if (Objects.isNull(pageSize) || pageSize < 0) {
            throw new InvalidArgumentException("Invalid pageSize");
        }
        List<OrderResponse> orders = orderService.getAllOrders(page, pageSize);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping(path = "/order")
    public ResponseEntity<OrderResponse> postOrder(@RequestBody @Valid PostOrderRequest postOrderRequest) {
        OrderResponse orderResponse = orderService.postOrder(postOrderRequest);
        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

}
