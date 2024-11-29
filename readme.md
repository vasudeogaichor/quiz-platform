# QuizMaster: Adaptive Online Practice Test Platform

## Project Overview
QuizMaster is an advanced online quiz platform designed for students in grades 7-10, featuring an adaptive testing system that dynamically adjusts question difficulty based on student performance.

## 🚀 Features
- User Authentication (Email/Google OAuth)
- Personalized Dashboard
- Computerized Adaptive Testing (CAT)
- Performance Tracking and Reporting
- Comprehensive Quiz Experience

## 📦 Tech Stack
### Frontend:
- Vite + React.js
- TypeScript
- TailwindCSS
- React Router
- Shadcn UI

### Backend:
- Express
- Mongoose

## 🛠️ Setup
### Prerequisites
- Node.js (v18+)
- npm

### Installation Steps and Environment variables
1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/quiz-platform.git
    cd quiz-platform
    ```

2. Install Frontend Dependencies and populate env file:
    ```bash
    cd frontend/
    cp .env.sample .env
    npm install
    ```
3. Run Development Server for Frontend:
    ```bash
    npm run dev
    ```
4. Install Backend Dependencies and populate env file:
    ```bash
    cd ../backend/
    cp .env.sample .env
    npm install
    ```
5. Run Development Server for Backend
    ```bash
    npm run dev
    ```
 
## 🧪 Testing

- Unit Tests: Jest
- Coverage Target: 90%
- Test Commands:

    ```bash
    npm run test
    npm run test:coverage
    ```


