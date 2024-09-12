package com.crm.imageservice.query.projection;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.imageservice.command.data.ImageRepository;
import com.crm.commonservice.model.ImageResponseCommonModel;
import com.crm.commonservice.query.GetDetailsImageQuery;
import com.crm.imageservice.command.data.Image;
import com.crm.imageservice.query.model.ImageResponseModel;
import com.crm.imageservice.query.queries.GetAllImagesQuery;
import com.crm.imageservice.query.queries.GetImageQuery;

@Component
public class ImageProjection {
    @Autowired
    private ImageRepository imageRepository;

    @QueryHandler
    public ImageResponseModel handle(GetImageQuery getimagesQuery) {
        ImageResponseModel model = new ImageResponseModel();
        Optional<Image> optionalImage = imageRepository.findById(getimagesQuery.getId());
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            BeanUtils.copyProperties(image, model);
        } else {
            throw new IllegalArgumentException("Image not found with id: " + getimagesQuery.getId());
        }
        return model;
    }

    @QueryHandler
    public ImageResponseCommonModel handle(GetDetailsImageQuery getimagesQuery) {
        ImageResponseCommonModel model = new ImageResponseCommonModel();
        Optional<Image> optionalImage = imageRepository.findById(getimagesQuery.getId());
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            BeanUtils.copyProperties(image, model);
        } else {
            throw new IllegalArgumentException("Image not found with id: " + getimagesQuery.getId());
        }
        return model;
    }

    @QueryHandler
    List<ImageResponseModel> handle(GetAllImagesQuery getAllimagesQuery) {
        List<Image> listEntity = imageRepository.findAll();
        List<ImageResponseModel> listimage = new ArrayList<>();
        listEntity.forEach(s -> {
            ImageResponseModel model = new ImageResponseModel();
            BeanUtils.copyProperties(s, model);
            listimage.add(model);
        });
        listimage.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        return listimage;
    }

}
