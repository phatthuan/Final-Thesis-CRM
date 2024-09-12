package com.crm.activityservice.service;

public interface FaceBookService {
    public String createPagePost(String message);
    public String createPagePostWithImage(String caption, String imageUrl);
}
