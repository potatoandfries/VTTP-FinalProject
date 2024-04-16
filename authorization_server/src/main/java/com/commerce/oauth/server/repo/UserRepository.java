package com.commerce.oauth.server.repo;

import com.commerce.oauth.server.model.User;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    // why use crudrepo vs template ;
    //  format nus taught?
    // out of box solutions; since its simple crud -> can just use this.
    Optional<User> findByEmail(String email);
}