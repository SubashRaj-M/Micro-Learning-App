package com.microlearning.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "user_progress")
@Data
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @Column(name = "quiz_attempts")
    private int quizAttempts = 0;

    @Column(name = "latest_score")
    private int latestScore = 0;

    // --- FIX IS HERE ---
    @Column(name = "total_questions")
    private Integer totalQuestions = 0; // Changed from 'int' to 'Integer'

    @Column(name = "last_studied_at")
    private LocalDateTime lastStudiedAt;
}