package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    public User findByUserID(int userID);
    
}
