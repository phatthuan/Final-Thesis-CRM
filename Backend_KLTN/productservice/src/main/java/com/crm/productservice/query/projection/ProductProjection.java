package com.crm.productservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.productservice.command.data.ProductRepository;
import com.crm.commonservice.model.ImageResponseCommonModel;
import com.crm.commonservice.query.GetDetailsImageQuery;
import com.crm.productservice.command.data.Product;
import com.crm.productservice.query.model.ProductResponseModel;
import com.crm.productservice.query.queries.GetAllProductsQuery;
import com.crm.productservice.query.queries.GetProductQuery;

@Component
public class ProductProjection {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private QueryGateway queryGateway;

    @QueryHandler
    public ProductResponseModel handle(GetProductQuery getproductsQuery) {
        ProductResponseModel model = new ProductResponseModel();
        Product product = productRepository.getById(getproductsQuery.getId());
        BeanUtils.copyProperties(product, model);
        if (getproductsQuery.getId() == null) {
            throw new IllegalStateException("User not found");
        }

        if (model.getImageId() != null && !model.getImageId().isEmpty()) {
            GetDetailsImageQuery imageQuery =  new GetDetailsImageQuery(model.getImageId());

            if (imageQuery != null) {
                ImageResponseCommonModel imageResponseCommonModel = queryGateway.query(imageQuery, ResponseTypes.instanceOf(ImageResponseCommonModel.class)).join();
                model.setImageTitle(imageResponseCommonModel.getTitle());
                model.setImageFile(imageResponseCommonModel.getImage());
            }
        }
        return model;
    }

    @QueryHandler
    List<ProductResponseModel> handle(GetAllProductsQuery getAllproductsQuery) {
        List<Product> listEntity = productRepository.findAll();
        List<ProductResponseModel> listproduct = new ArrayList<>();
        listEntity.forEach(s -> {
            ProductResponseModel model = new ProductResponseModel();
            BeanUtils.copyProperties(s, model);
            if (model.getImageId() != null && !model.getImageId().isEmpty()) {
                GetDetailsImageQuery imageQuery =  new GetDetailsImageQuery(model.getImageId());
    
                if (imageQuery != null) {
                    ImageResponseCommonModel imageResponseCommonModel = queryGateway.query(imageQuery, ResponseTypes.instanceOf(ImageResponseCommonModel.class)).join();
                    model.setImageTitle(imageResponseCommonModel.getTitle());
                    model.setImageFile(imageResponseCommonModel.getImage());
                }
            }
            listproduct.add(model);
            listproduct.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        });
        return listproduct;
    }

}
