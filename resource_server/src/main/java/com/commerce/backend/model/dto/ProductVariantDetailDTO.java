package com.commerce.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProductVariantDetailDTO {
    private Long id;
    private Long productId;
    private Long colorId;
    private Float price;
    private String size;
    private String material;
    private Float cargoPrice;
    private Integer taxPercent;
    private Integer sellCount;
    private Boolean live;
    private String image;
    private String thumb;
    private ColorDTO color;
}
