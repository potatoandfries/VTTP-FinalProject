package com.commerce.backend.service.cache;

import com.commerce.backend.model.entity.Color;
import com.commerce.backend.repo.ColorRepository;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

@CacheConfig(cacheNames = "product_color")
public class ProductColorCacheServiceImpl implements ProductColorCacheService {

    private final ColorRepository colorRepository;
    public ProductColorCacheServiceImpl(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    @Override
    @Cacheable(key = "#root.methodName", unless = "#result.size()==0")
    public List<Color> findAll() {
        return colorRepository.findAll();
    }
}
