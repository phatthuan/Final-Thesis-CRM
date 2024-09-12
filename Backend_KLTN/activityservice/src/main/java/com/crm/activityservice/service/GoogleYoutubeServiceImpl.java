package com.crm.activityservice.service;

import com.crm.activityservice.auth.GoogleAuth;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.googleapis.media.MediaHttpUploader;
import com.google.api.client.googleapis.media.MediaHttpUploaderProgressListener;
import com.google.api.client.http.InputStreamContent;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;
import com.google.common.collect.Lists;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GoogleYoutubeServiceImpl implements GoogleYoutubeService {
    private static YouTube youtube;

    private static final String VIDEO_FILE_FORMAT = "video/*";

    @Override
    public Video createYoutubeVideo(String title, String description, MultipartFile file) throws IOException {
        List<String> scopes = Lists.newArrayList("https://www.googleapis.com/auth/youtube.upload");

        try {
            Credential credential = GoogleAuth.authorize(scopes, "uploadvideo");
            youtube = new YouTube.Builder(GoogleAuth.HTTP_TRANSPORT, GoogleAuth.JSON_FACTORY, credential)
                    .setApplicationName("CRM").build();
                    

            Video videoMetadata = new Video();

            VideoStatus status = new VideoStatus();
            status.setPrivacyStatus("public");
            videoMetadata.setStatus(status);

            VideoSnippet snippet = new VideoSnippet();
            Calendar cal = Calendar.getInstance();
            snippet.setTitle(title +" "+ cal.getTime());
            snippet.setDescription(description + " on " + cal.getTime());

            List<String> tags = new ArrayList<>();
            tags.add("CRM");
            tags.add("java");
            snippet.setTags(tags);

            videoMetadata.setSnippet(snippet);

            InputStream inputStream = file.getInputStream();
            InputStreamContent mediaContent = new InputStreamContent(VIDEO_FILE_FORMAT, inputStream);

            YouTube.Videos.Insert videoInsert = youtube.videos()
                    .insert("snippet,statistics,status", videoMetadata, mediaContent);

            MediaHttpUploader uploader = videoInsert.getMediaHttpUploader();
            uploader.setDirectUploadEnabled(false);

            uploader.setProgressListener(new MediaHttpUploaderProgressListener() {
                @Override
                public void progressChanged(MediaHttpUploader uploader) throws IOException {
                    switch (uploader.getUploadState()) {
                        case INITIATION_STARTED:
                            System.out.println("Initiation Started");
                            break;
                        case INITIATION_COMPLETE:
                            System.out.println("Initiation Completed");
                            break;
                        case MEDIA_IN_PROGRESS:
                            System.out.println("Upload in progress");
                            System.out.println("Upload percentage: " + uploader.getProgress());
                            break;
                        case MEDIA_COMPLETE:
                            System.out.println("Upload Completed!");
                            break;
                        case NOT_STARTED:
                            System.out.println("Upload Not Started!");
                            break;
                    }
                }
            });

            return videoInsert.execute();

        } catch (GoogleJsonResponseException e) {
            throw new IOException("GoogleJsonResponseException: " + e.getDetails().getMessage(), e);
        }
    }

}
