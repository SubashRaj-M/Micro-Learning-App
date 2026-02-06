package com.microlearning.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microlearning.backend.entity.Topic;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    // No extra code needed! JpaRepository gives us findAll(), save(), etc.
}