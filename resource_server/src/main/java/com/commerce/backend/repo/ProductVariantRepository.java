package com.commerce.backend.repo;

import com.commerce.backend.model.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepository extends 
        CrudRepository<ProductVariant, Long>, 
        PagingAndSortingRepository<ProductVariant, Long>, 
        JpaSpecificationExecutor<ProductVariant> {
    List<ProductVariant> findTop8ByOrderBySellCountDesc();
}
