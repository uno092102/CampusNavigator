package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer>
{
    public Feedback findByFeedbackID(int feedbackID);
    
}
