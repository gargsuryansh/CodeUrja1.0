package com.backend.nextwave.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private long id;

//    @Column(nullable = false)
    private String name;
    @Column(nullable = false , length = 255)
    private String Username;
    @Column(nullable = false , length = 255 , unique = true)
    private String email;
    @Column(nullable = false , length = 255)
    private String password;
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private boolean twoFactorEnabled;

    private LocalDate localDate;


}
