package com.microlearning.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microlearning.backend.entity.QuizQuestion;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findByTopicId(Long topicId);
}