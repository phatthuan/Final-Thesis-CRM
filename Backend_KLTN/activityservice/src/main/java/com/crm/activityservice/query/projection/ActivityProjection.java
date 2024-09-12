package com.crm.activityservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.activityservice.command.data.ActivityRepository;
import com.crm.activityservice.command.data.Activity;
import com.crm.activityservice.query.model.ActivityResponseModel;
import com.crm.activityservice.query.queries.GetAllActivitiesQuery;
import com.crm.activityservice.query.queries.GetActivityQuery;

@Component
public class ActivityProjection {
    @Autowired
    private ActivityRepository activityRepository;

    @QueryHandler
    public ActivityResponseModel handle(GetActivityQuery getactivitysQuery) {
        ActivityResponseModel model = new ActivityResponseModel();
        Activity activity = activityRepository.getById(getactivitysQuery.getId());
        BeanUtils.copyProperties(activity, model);

        return model;
    }

    @QueryHandler
    List<ActivityResponseModel> handle(GetAllActivitiesQuery getAllactivitysQuery) {
        List<Activity> listEntity = activityRepository.findAll();
        List<ActivityResponseModel> listactivity = new ArrayList<>();
        listEntity.forEach(s -> {
            ActivityResponseModel model = new ActivityResponseModel();
            BeanUtils.copyProperties(s, model);
            listactivity.add(model);
        });
        listactivity.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        return listactivity;
    }

}
