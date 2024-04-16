package com.commerce.backend.service;

import com.commerce.backend.error.exception.InvalidArgumentException;
import com.commerce.backend.error.exception.ResourceNotFoundException;
import com.commerce.backend.model.entity.Cart;
import com.commerce.backend.model.entity.Discount;
import com.commerce.backend.repo.DiscountRepository;

import org.springframework.stereotype.Service;


@Service
public class DiscountServiceImpl implements DiscountService {

    private final DiscountRepository discountRepository;
    private final CartService cartService;
    public DiscountServiceImpl(DiscountRepository discountRepository, CartService cartService) {
        this.discountRepository = discountRepository;
        this.cartService = cartService;
    }

    @Override
    public void applyDiscount(String code) {
        Discount discount = discountRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Discount code not found"));

        if (discount.getStatus() != 1) {
            throw new InvalidArgumentException("Discount code is expired!");
        }

        Cart cart = cartService.getCart();

        cart.setDiscount(discount);
        cart = cartService.calculatePrice(cart);
        cartService.saveCart(cart);
    }
}
