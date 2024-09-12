package com.crm.activityservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface PublicImageService {
    public String getImageUrl(MultipartFile imageFile);
}