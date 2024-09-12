package com.crm.activityservice.service;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PublicImageServiceImpl implements PublicImageService {

    private String baseUrl = "";
    private String APIKey = "";

    private RestTemplate restTemplate = new RestTemplate();
    private ObjectMapper objectMapper = new ObjectMapper();

    public String getImageUrl(MultipartFile imageFile) {
        try {
            byte[] imageBytes = Base64.encodeBase64(imageFile.getBytes());
            String base64String = new String(imageBytes);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", base64String);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String uploadUrl = baseUrl + "upload?key=" + APIKey;
            ResponseEntity<String> response = restTemplate.postForEntity(uploadUrl, requestEntity, String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            String imageUrl = jsonNode.get("data").get("url").asText();
            return imageUrl;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error uploading image: " + e.getMessage();
        }
    }
}
