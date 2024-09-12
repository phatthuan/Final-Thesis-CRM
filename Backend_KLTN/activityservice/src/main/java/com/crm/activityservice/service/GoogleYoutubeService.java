package com.crm.activityservice.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.google.api.services.youtube.model.Video;

public interface GoogleYoutubeService {
    public Video createYoutubeVideo(String title, String description, MultipartFile file) throws IOException;
}
