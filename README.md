# 🎓 Micro-Learning Web Application

A full-stack web application designed to facilitate micro-learning through flashcards and quizzes. This system allows Administrators to manage educational content and Students to study topics, take assessments, and track their learning progress.

## 🚀 Features

### 👨‍💼 Admin Features
* **Content Management:** Create, edit, and delete learning Topics (e.g., "React Basics", "Java Fundamentals").
* **Flashcard Management:** Add study flashcards to specific topics.
* **Quiz Management:** Create multiple-choice quiz questions with automatic grading logic.
* **Secure Access:** Exclusive access to the Content Creator Panel.

### 👨‍🎓 Student Features
* **Interactive Study:** Flip-card animation for studying flashcards.
* **Assessment:** Take interactive quizzes with immediate feedback.
* **Progress Tracking:** View personal dashboard with quiz attempts, latest scores, and last studied dates.
* **Topic Browser:** View all available learning modules.

## 🛠️ Tech Stack

### Backend
* **Language:** Java
* **Framework:** Spring Boot (Web, Data JPA, Security)
* **Database:** MySQL
* **Build Tool:** Maven

### Frontend
* **Library:** React.js
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Styling:** CSS3

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Ensure you have the following installed on your machine:
* Java JDK 17+
* Node.js & npm
* MySQL Server
* Git

### 2. Database Setup
1.  Open your MySQL Workbench or Terminal.
2.  Create a new database named `microlearning`.
3.  (Optional) The application uses `hibernate.ddl-auto=update`, so tables will be created automatically upon the first run.

### 3. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Update `src/main/resources/application.properties` with your MySQL credentials:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/microlearning
    spring.datasource.username=YOUR_USERNAME
    spring.datasource.password=YOUR_PASSWORD
    ```
3.  Run the application:
    ```bash
    mvn spring-boot:run
    ```
The Backend API will start at `http://localhost:8080`.

### 4. Frontend Setup
1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
The Frontend will launch at `http://localhost:3000`.

---

## 📖 Usage Guide

### 1. Registration
* Open the app at `http://localhost:3000`.
* Click **"Sign Up"** to create a new account.
* *Note: The first user created should be updated to Role `ADMIN` via database SQL if you want to access Admin features immediately.*

### 2. Login
* **Admin Login:** Access the Creator Panel to add Topics and Quizzes.
* **Student Login:** Access the User Dashboard to see topics created by the Admin.

### 3. Workflow
1.  **Admin** creates a Topic (e.g., "History").
2.  **Admin** adds Flashcards and Quiz Questions to "History".
3.  **Student** logs in, sees "History", studies flashcards, and takes the quiz.
4.  **Student** views their score in the "Progress Report".

---

## 📸 Screenshots

*(Optional: You can upload your screenshots to an `assets` folder and link them here)*

| Admin Dashboard | Student Quiz | Progress Report |
|:---:|:---:|:---:|
| ![Admin](https://via.placeholder.com/150) | ![Quiz](https://via.placeholder.com/150) | ![Progress](https://via.placeholder.com/150) |

## 🤝 Contributing
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

## 📄 License
This project is open-source and available under the Zoho Schools by Subash Raj M.
