package com.microlearning.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microlearning.backend.entity.QuizQuestion;
import com.microlearning.backend.entity.Topic;
import com.microlearning.backend.entity.User;
import com.microlearning.backend.entity.UserProgress;
import com.microlearning.backend.repository.QuizQuestionRepository;
import com.microlearning.backend.repository.TopicRepository;
import com.microlearning.backend.repository.UserProgressRepository;
import com.microlearning.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin("*")
public class QuizController {

    private final QuizQuestionRepository questionRepo;
    private final UserProgressRepository progressRepo;
    private final TopicRepository topicRepo;
    private final UserRepository userRepo;

    public QuizController(QuizQuestionRepository questionRepo, UserProgressRepository progressRepo, TopicRepository topicRepo, UserRepository userRepo) {
        this.questionRepo = questionRepo;
        this.progressRepo = progressRepo;
        this.topicRepo = topicRepo;
        this.userRepo = userRepo;
    }

    // 1. ADMIN: Add a Question to a Topic
    @PostMapping("/{topicId}/questions")
    public QuizQuestion addQuestion(@PathVariable Long topicId, @RequestBody QuizQuestion question) {
        return topicRepo.findById(topicId).map(topic -> {
            question.setTopic(topic);
            return questionRepo.save(question);
        }).orElseThrow(() -> new RuntimeException("Topic not found"));
    }

    // 2. USER: Get Questions for a Topic (To take the quiz)
    @GetMapping("/{topicId}/questions")
    public List<QuizQuestion> getQuestions(@PathVariable Long topicId) {
        return questionRepo.findByTopicId(topicId);
    }

    // 3. USER: Submit Quiz Score (Updates UserProgress)
    // 3. USER: Submit Quiz Score (Updates UserProgress)
    @PostMapping("/{topicId}/submit")
    public UserProgress submitQuiz(
            @PathVariable Long topicId, 
            @RequestParam String username, 
            @RequestParam int score,
            @RequestParam int totalQuestions // <--- ADD THIS PARAMETER
    ) {
        User user = userRepo.findByUsername(username).orElseThrow();
        Topic topic = topicRepo.findById(topicId).orElseThrow();

        // Check if progress already exists
        UserProgress progress = progressRepo.findByUserIdAndTopicId(user.getId(), topic.getId())
                .orElse(new UserProgress());

        if (progress.getId() == null) {
            progress.setUser(user);
            progress.setTopic(topic);
        }

        // Update Stats
        progress.setQuizAttempts(progress.getQuizAttempts() + 1);
        progress.setLatestScore(score);
        progress.setTotalQuestions(totalQuestions); 
        progress.setLastStudiedAt(LocalDateTime.now());

        return progressRepo.save(progress);
    }
    // 4. USER: Get My Progress Report
    @GetMapping("/progress")
    public List<UserProgress> getUserProgress(@RequestParam String username) {
        User user = userRepo.findByUsername(username).orElseThrow();
        return progressRepo.findByUserId(user.getId());
    }
   

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        if (questionRepo.existsById(id)) {
            questionRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}