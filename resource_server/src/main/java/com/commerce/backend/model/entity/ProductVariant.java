package com.commerce.backend.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "product_variant")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @Column(name = "price")
    private Float price;

    @Column(name = "size")
    private String size;

    @Column(name = "material")
    private String material;

    @Column(name = "cargo_price")
    private Float cargoPrice;

    @Column(name = "tax_percent")
    private Integer taxPercent;

    @Column(name = "sell_count")
    private Integer sellCount;

    @Column(name = "live")
    private Boolean live;

    @Column(name = "image")
    private String image;

    @Column(name = "thumb")
    private String thumb;

}
