package com.microlearning.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microlearning.backend.entity.UserProgress;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndTopicId(Long userId, Long topicId);
    List<UserProgress> findByUserId(Long userId);
}