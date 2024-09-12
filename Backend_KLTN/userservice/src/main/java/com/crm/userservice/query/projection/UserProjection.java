package com.crm.userservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.userservice.command.data.UserRepository;
import com.crm.commonservice.model.ImageResponseCommonModel;
import com.crm.commonservice.model.UserResponseCommonModel;
import com.crm.commonservice.query.GetDetailsImageQuery;
import com.crm.commonservice.query.GetDetailsUserQuery;
import com.crm.userservice.command.data.User;
import com.crm.userservice.query.model.UserResponseModel;
import com.crm.userservice.query.queries.GetAllUsersQuery;
import com.crm.userservice.query.queries.GetUserQuery;

@Component
public class UserProjection {
    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private QueryGateway queryGateway;

    @QueryHandler
    public UserResponseModel handle(GetUserQuery getUsersQuery) {
        UserResponseModel model = new UserResponseModel();
        User User = UserRepository.getById(getUsersQuery.getId());
        BeanUtils.copyProperties(User, model);
        if (getUsersQuery.getId() == null) {
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
    public UserResponseCommonModel handle(GetDetailsUserQuery getUsersQuery) {
        UserResponseCommonModel model = new UserResponseCommonModel();
        User user = UserRepository.getById(getUsersQuery.getId());
        BeanUtils.copyProperties(user, model);

        return model;
    }

    @QueryHandler
    List<UserResponseModel> handle(GetAllUsersQuery getAllUsersQuery) {
        List<User> listEntity = UserRepository.findAll();
        List<UserResponseModel> listUser = new ArrayList<>();
        listEntity.forEach(s -> {
            UserResponseModel model = new UserResponseModel();
            BeanUtils.copyProperties(s, model);
            if (model.getImageId() != null && !model.getImageId().isEmpty()) {
                GetDetailsImageQuery imageQuery =  new GetDetailsImageQuery(model.getImageId());
    
                if (imageQuery != null) {
                    ImageResponseCommonModel imageResponseCommonModel = queryGateway.query(imageQuery, ResponseTypes.instanceOf(ImageResponseCommonModel.class)).join();
                    model.setImageTitle(imageResponseCommonModel.getTitle());
                    model.setImageFile(imageResponseCommonModel.getImage());
                }
            }
            listUser.add(model);
            listUser.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        });
        return listUser;
    }

}
