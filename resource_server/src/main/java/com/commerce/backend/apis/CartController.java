package com.commerce.backend.apis;


import com.commerce.backend.model.request.cart.*;
import com.commerce.backend.model.response.cart.CartResponse;
import com.commerce.backend.service.CartService;

import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
public class CartController extends ApiController {

    private final CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping(path = "/cart")
    public ResponseEntity<CartResponse> addToCart(@RequestBody @Valid AddToCartRequest addToCartRequest) {
        CartResponse cartResponse = cartService.addToCart(addToCartRequest.getProductVariantId(), addToCartRequest.getAmount());
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }

    @PostMapping(path = "/cart/increment")
    public ResponseEntity<CartResponse> increaseCartItem(@RequestBody @Valid IncrementCartItemRequest incrementCartItemRequest) {
        CartResponse cartResponse = cartService.incrementCartItem(incrementCartItemRequest.getCartItemId(), incrementCartItemRequest.getAmount());
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }

    @PostMapping(path = "/cart/decrement")
    public ResponseEntity<CartResponse> decreaseCartItem(@RequestBody @Valid DecrementCartItemRequest decrementCartItemRequest) {
        CartResponse cartResponse = cartService.decrementCartItem(decrementCartItemRequest.getCartItemId(), decrementCartItemRequest.getAmount());
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }

    @GetMapping(path = "/cart")
    public ResponseEntity<CartResponse> fetchCart() {
        CartResponse cartResponse = cartService.fetchCart();
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }

    @PostMapping(path = "/cart/remove")
    public ResponseEntity<CartResponse> removeFromCart(@RequestBody @Valid RemoveFromCartRequest removeFromCartRequest) {
        CartResponse cartResponse = cartService.removeFromCart(removeFromCartRequest.getCartItemId());
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }

    @DeleteMapping(path = "/cart")
    public ResponseEntity<HttpStatus> emptyCart() {
        cartService.emptyCart();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/cart/confirm")
    public ResponseEntity<Boolean> confirmCart(@RequestBody @Valid ConfirmCartRequest confirmCartRequest) {
        Boolean confirmCart = cartService.confirmCart(confirmCartRequest);
        return new ResponseEntity<>(confirmCart, HttpStatus.OK);
    }

}
