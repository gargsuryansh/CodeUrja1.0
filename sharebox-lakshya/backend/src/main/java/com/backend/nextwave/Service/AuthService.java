package com.backend.nextwave.Service;

import com.backend.nextwave.Config.JwtConfig;
import com.backend.nextwave.Exception.CommanException;
import com.backend.nextwave.Exception.UserNotFoundException;
import com.backend.nextwave.Model.User;
import com.backend.nextwave.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtConfig jwtConfig;

    public User signUpUser(User user) throws UserNotFoundException {
        Optional<User> user1 = userRepository.findByEmail(user.getEmail());
        if (user1.isPresent()) {
            throw new UserNotFoundException();
        }
        return userRepository.save(user);

    }
    public User loginUser(String email , String password) throws CommanException, UserNotFoundException {
        Optional<User> user1 = userRepository.findByEmail(email);
        if (user1.isPresent()) {
            if(user1.get().getPassword().equals(password)){
                return user1.get();
            }else {
                throw new UserNotFoundException();
            }
        }else{
            throw new CommanException("User Already Exist");
        }
    }


    public User extraceUser(String token) throws Exception {
        String email = jwtConfig.extractEmail(token);
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            return user.get();
        }else {
            throw new UserNotFoundException();
        }
    }

    public User enableTwoStepVerification(String email) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            User user1 = user.get();
            user1.setTwoFactorEnabled(!user1.isTwoFactorEnabled());
            userRepository.save(user1);
            return user1;
        }else {
            throw new UserNotFoundException();
        }
    }

}
