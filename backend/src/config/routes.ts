import { Routes } from "../types/routes";

export const routes: Routes = {
  auth: {
    'POST /login': {
      handler: 'AuthController.login',
      middleware: ['validateLoginInput'],
    },
    'POST /signup': {
      handler: 'AuthController.signup',
      middleware: ['validateSignupInput'],
    },
    'POST /google-auth': {
      handler: 'AuthController.googleAuth',
    },
  },
  quiz: {
    'GET /questions': {
      handler: 'QuizController.getQuestions',
      middleware: ['auth'],
    },
    'POST /submit-answer': {
      handler: 'QuizController.submitAnswer',
      middleware: ['auth'],
    },
    'POST /complete-quiz': {
      handler: 'QuizController.completeQuiz',
      middleware: ['auth'],
    },
  },
  user: {
    'GET /profile': { 
      handler: 'UserController.getProfile',
      middleware: ['auth'],
    },
    'PUT /profile': {
      handler: 'UserController.updateProfile',
      middleware: ['auth', 'validateProfileInput'],
    },
  },
};
