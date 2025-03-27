package com.backend.nextwave.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FileUploadRequest {

    private String password;
    private boolean oneTimeAccess;
    private LocalDate expiryDate;

}
