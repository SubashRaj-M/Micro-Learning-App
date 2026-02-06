-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema micro_learning_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema micro_learning_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `micro_learning_db` DEFAULT CHARACTER SET utf8 ;
USE `micro_learning_db` ;

-- -----------------------------------------------------
-- Table `micro_learning_db`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `micro_learning_db`.`Users` (
  `id` BIGINT NOT NULL,
  `username` VARCHAR(50) NULL,
  `password` VARCHAR(255) NULL,
  `role` ENUM('USER', 'ADMIN') NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `micro_learning_db`.`topics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `micro_learning_db`.`topics` (
  `id` BIGINT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `micro_learning_db`.`flashcards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `micro_learning_db`.`flashcards` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `topic_id` BIGINT NOT NULL,
  `question` TEXT NOT NULL,
  `answer` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_flashcards_topics_idx` (`topic_id` ASC) VISIBLE,
  CONSTRAINT `fk_flashcards_topics`
    FOREIGN KEY (`topic_id`)
    REFERENCES `micro_learning_db`.`topics` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `micro_learning_db`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `micro_learning_db`.`questions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `topic_id` BIGINT NOT NULL,
  `question_text` TEXT NOT NULL,
  `option_a` VARCHAR(255) NULL,
  `option_b` VARCHAR(255) NULL,
  `option_c` VARCHAR(255) NULL,
  `option_d` VARCHAR(255) NULL,
  `correct_option` CHAR(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_questions_topics1_idx` (`topic_id` ASC) VISIBLE,
  CONSTRAINT `fk_questions_topics1`
    FOREIGN KEY (`topic_id`)
    REFERENCES `micro_learning_db`.`topics` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `micro_learning_db`.`user_progress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `micro_learning_db`.`user_progress` (
  `id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `topic_id` BIGINT NOT NULL,
  `last_studied_at` TIMESTAMP NULL,
  `quiz_attempts` INT NULL,
  `latest_score` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_progress_Users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_progress_topics1_idx` (`topic_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_progress_Users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `micro_learning_db`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_progress_topics1`
    FOREIGN KEY (`topic_id`)
    REFERENCES `micro_learning_db`.`topics` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
