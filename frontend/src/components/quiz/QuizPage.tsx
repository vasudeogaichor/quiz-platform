import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuizQuestion from "./QuizQuestion";
import { useUserStore } from "@/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { completeQuiz, getQuestion, submitAnswer } from "@/api/quiz";
import { useToast } from "@/hooks/useToast";

// Define types for the quiz
interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  _id?: string;
  text: string;
  options: Option[];
  topic: string;
  difficulty: 3 | 5 | 8;
}

const TOTAL_QUESTIONS = 20;

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { toast } = useToast();
  const [attemptId, setAttemptId] = useState<string | undefined>();
  // console.log("attemptId - ", attemptId);
  // console.log("QuizPage user - ", user, user?.grade);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  // console.log("currentQuestion - ", currentQuestion);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string | null>();
  // console.log("currentSelectedOption - ", currentSelectedOption);

  // Quiz state management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // console.log('currentQuestionIndex - ', currentQuestionIndex)
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes total
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (currentQuestion) {
      currentQuestion.options = currentQuestion.options.map(
        (option, index) => ({ ...option, id: index.toString() })
      );
    }
  }, [currentQuestion]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleQuizSubmit(attemptId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    (async () => {
      const response = await getQuestion();
      // console.log("response - ", response);
      if (response.success) {
        setAttemptId(response.data.attemptId);
        setCurrentQuestion(response.data.question);
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
        navigate("/");
      }
    })();

    return () => clearInterval(timer);
  }, [quizStarted]);

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    // console.log("optionId - ", optionId);
    setCurrentSelectedOption(optionId);
  };

  // Move to next question or submit quiz
  const handleNextQuestion = async () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      try {
        await submitAnswer({
          attemptId,
          questionId: currentQuestion?._id,
          answer: parseInt(currentSelectedOption || "0"),
        });

        // console.log("submit response - ", response);

        const nextQuestion = await getQuestion();
        // console.log('nextQuestion - ', nextQuestion)
        if (nextQuestion.success) {
           setCurrentQuestion(nextQuestion.data.question);
           setCurrentQuestionIndex(currentQuestionIndex + 1);
           setCurrentSelectedOption(null);
        } else {
          toast({
            variant: "destructive",
            title: "Something went wrong",
          });
          navigate("/")
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
        navigate("/")
      }
    } else {
        handleQuizSubmit(attemptId);
    }
  };

  // Submit quiz and navigate to results
  const handleQuizSubmit = async (attemptId: string | undefined) => {
    try {
      const response = await completeQuiz(attemptId || "");
      // console.log('handleQuizSubmit response - ', response)
      if (response.success) {
        navigate("/results", {
          state: {
            totalQuestions: TOTAL_QUESTIONS,
            correctAnswers: response.data.correctAnswers,
            score: response.data.score,
            recommendations: response.data.recommendations,
            topicPerformances: response.data.topicPerformance,
            timeSpent: 45 * 60 - timeRemaining,
          },
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
        navigate("/")
      }
    } catch(error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      navigate("/");
    }
  };

  // If quiz hasn't started, show start screen
  if (!quizStarted) {
    return (
      <>
        {!user?.grade && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>Update Your Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Please set your grade using settings to continue with the
                  quiz.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="default"
                  onClick={() => {
                    navigate("/settings");
                  }}
                >
                  Update Grade
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Quiz Instructions</h1>
            <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
              <li>• Total Questions: {TOTAL_QUESTIONS}</li>
              <li>• Time Limit: 45 minutes</li>
              <li>• Each question has 4 options</li>
              <li>• You cannot go back to previous questions</li>
            </ul>
            <Button size="lg" onClick={() => setQuizStarted(true)}>
              Start Quiz
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Render current question
  return (
    <>
      {currentQuestion && (
        <QuizQuestion
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={currentQuestion.text}
          options={currentQuestion.options}
          selectedOption={currentSelectedOption || null}
          onSelectOption={handleOptionSelect}
          onSubmit={handleNextQuestion}
          timeRemaining={timeRemaining}
        />
      )}
    </>
  );
};

export default QuizPage;
