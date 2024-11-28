package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.Feedback;
import java.util.List;


@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{
    
    Feedback findByFeedbackID(int feedbackID);
}
