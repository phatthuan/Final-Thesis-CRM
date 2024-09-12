package com.crm.activityservice.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FaceBookServiceImpl implements FaceBookService {

    private String baseUrl = "";
    private String accessToken = "";
    private String pageId = "";

    private RestTemplate restTemplate = new RestTemplate();

    @Override
    public String createPagePost(String message) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String url = baseUrl + pageId + "/feed";
            String body = "{\"message\": \"" + message + "\", \"access_token\": \"" + accessToken + "\"}";

            HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            return response.getBody();
        } catch (Exception e) {
            System.out.println("Error creating page post: " + e.getMessage());
            return "Error creating page post";
        }
    }

    @Override
    public String createPagePostWithImage(String caption, String imageUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String url = baseUrl + pageId + "/photos";
            String body = "{\"caption\": \"" + caption + "\", \"url\": \"" + imageUrl + "\", \"access_token\": \"" + accessToken + "\"}";

            HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            return response.getBody();
        } catch (Exception e) {
            System.out.println("Error creating page post: " + e.getMessage());
            return "Error creating page post";
        }
    }
}
