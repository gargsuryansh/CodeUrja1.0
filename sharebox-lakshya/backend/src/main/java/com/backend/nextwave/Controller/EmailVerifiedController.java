package com.backend.nextwave.Controller;

import com.backend.nextwave.Config.JwtConfig;
import com.backend.nextwave.Exception.UnAuthorizeException;
import com.backend.nextwave.Service.EmailVerifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/*
This controller is can be used when we want to varify email
 */

@RestController
@RequestMapping("/api/email")
public class EmailVerifiedController {

    @Autowired
    private EmailVerifyService emailVerifyService;

    @Autowired
    private JwtConfig jwtConfig;

    @PostMapping("/send")
    public String sendOtp(@RequestParam String email ,@RequestHeader("Authorization") String token) throws UnAuthorizeException {
        if (!jwtConfig.validateToken(token)){
            throw new UnAuthorizeException();
        }
        emailVerifyService.generateAndSendOtp(email);
        return "OTP sent to " + email;
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp,@RequestHeader("Authorization") String token) throws UnAuthorizeException {
        if (!jwtConfig.validateToken(token)){
            throw new UnAuthorizeException();
        }
        return emailVerifyService.verifyOtp(email, otp);
    }



}