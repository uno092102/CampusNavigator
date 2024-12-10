package com.campusnavigator.Service;

import java.util.List;

import javax.naming.NameAlreadyBoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.User;
import com.campusnavigator.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository urepo;

    public UserService(){
        super();
    }
//create
    public User postUserRecord(User user){
        return urepo.save(user);
    }
//read
    public List<User> getAllUser(){
        return urepo.findAll();
    }
//update
@SuppressWarnings("finally")
public User putUser(int userID, User newUser)
{
    User search = new User();

    try {
        search = urepo.findById(userID).get();

       
        search.setPassword(newUser.getPassword());

    } catch (NoClassDefFoundError nex){
        throw new NameAlreadyBoundException("Search UserID: " + userID + " not found");
    }finally
    {
        return urepo.save(search);
    }
}
//delete
public String deleteUser(int userID)
{
    String msg = "";

    if(urepo.findById(userID)!= null)
    {
        urepo.deleteById(userID);
        msg = "Search User Successfully Deleted!";
    }
    else
    {
        msg = userID + " NOT found.";
    }

    return msg;
}
}
