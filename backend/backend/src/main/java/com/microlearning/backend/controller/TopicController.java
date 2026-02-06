package com.microlearning.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microlearning.backend.entity.Flashcard;
import com.microlearning.backend.entity.Topic;
import com.microlearning.backend.repository.FlashcardRepository;
import com.microlearning.backend.repository.TopicRepository;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin("*")
public class TopicController {

    private final TopicRepository topicRepository;
    private final FlashcardRepository flashcardRepository;

    public TopicController(TopicRepository topicRepository, FlashcardRepository flashcardRepository) {
        this.topicRepository = topicRepository;
        this.flashcardRepository = flashcardRepository;
    }

    // 1. Get All Topics (For the User Dashboard)
    @GetMapping
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    // 2. Create a Topic (For Admins)
    @PostMapping
    public Topic createTopic(@RequestBody Topic topic) {
        return topicRepository.save(topic);
    }

    // 3. Add a Flashcard to a Topic (For Admins)
    @PostMapping("/{topicId}/flashcards")
    public ResponseEntity<Flashcard> addFlashcard(@PathVariable Long topicId, @RequestBody Flashcard flashcard) {
        return topicRepository.findById(topicId).map(topic -> {
            flashcard.setTopic(topic);
            return ResponseEntity.ok(flashcardRepository.save(flashcard));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Get Flashcards for a specific Topic (For Study Mode)
    @GetMapping("/{topicId}/flashcards")
    public List<Flashcard> getFlashcardsByTopic(@PathVariable Long topicId) {
        return flashcardRepository.findByTopicId(topicId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        if (topicRepository.existsById(id)) {
            topicRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Add to TopicController.java

    @DeleteMapping("/flashcards/{id}")
    public ResponseEntity<Void> deleteFlashcard(@PathVariable Long id) {
        if (flashcardRepository.existsById(id)) {
            flashcardRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Optional: PUT (Edit) Flashcard
    @PutMapping("/flashcards/{id}")
    public ResponseEntity<Flashcard> updateFlashcard(@PathVariable Long id, @RequestBody Flashcard updatedFlashcard) {
        return flashcardRepository.findById(id).map(card -> {
            card.setQuestion(updatedFlashcard.getQuestion());
            card.setAnswer(updatedFlashcard.getAnswer());
            return ResponseEntity.ok(flashcardRepository.save(card));
        }).orElse(ResponseEntity.notFound().build());
    }
}
