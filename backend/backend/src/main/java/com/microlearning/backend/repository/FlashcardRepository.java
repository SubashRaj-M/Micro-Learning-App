package com.microlearning.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microlearning.backend.entity.Flashcard;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    // Fetch all flashcards belonging to a specific Topic ID
    List<Flashcard> findByTopicId(Long topicId);
}