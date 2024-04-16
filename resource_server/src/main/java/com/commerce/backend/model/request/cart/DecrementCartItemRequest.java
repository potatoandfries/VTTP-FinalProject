package com.commerce.backend.model.request.cart;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;


@Data
public class DecrementCartItemRequest {
    @NotNull
    @Min(1)
    private Long cartItemId;

    @NotNull
    @Min(1)
    private Integer amount;
}
