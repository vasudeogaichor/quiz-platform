import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuizQuestion from './quizQuestion';

// Define types for the quiz
interface Option {
    id: string
    text: string
}

interface Question {
    id: string
    text: string
    options: Option[]
    topic: string
    difficulty: 'easy' | 'medium' | 'hard'
}

// Mock data - in a real app, this would come from an API
const mockQuestions: Question[] = [
    {
        id: '1',
        text: 'What is the result of 3x + 5 = 20 when solved for x?',
        topic: 'Algebra',
        difficulty: 'medium',
        options: [
            { id: '0', text: 'x = 5' },
            { id: '1', text: 'x = 15/3' },
            { id: '2', text: 'x = 10/2' },
            { id: '3', text: 'x = 3' }
        ]
    },
    {
        id: '2',
        text: 'What is the area of a triangle with base 6 and height 8?',
        topic: 'Geometry',
        difficulty: 'easy',
        options: [
            { id: '0', text: '24' },
            { id: '1', text: '12' },
            { id: '2', text: '48' },
            { id: '3', text: '16' }
        ]
    },
    // Add more questions...
]
// .concat(Array.from({ length: 18 }, (_, i) => ({
//     id: `${i + 3}`,
//     text: `Sample Question ${i + 3}`,
//     topic: ['Algebra', 'Geometry', 'Statistics'][i % 3],
//     difficulty: ['easy', 'medium', 'hard'][i % 3] as 'easy' | 'medium' | 'hard',
//     options: [
//         { id: '0', text: 'Option A' },
//         { id: '1', text: 'Option B' },
//         { id: '2', text: 'Option C' },
//         { id: '3', text: 'Option D' }
//     ]
// })));

const QuizPage: React.FC = () => {
    const navigate = useNavigate()

    // Quiz state management
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
    const [timeRemaining, setTimeRemaining] = useState(45 * 60) // 45 minutes total
    const [quizStarted, setQuizStarted] = useState(false)

    // Adaptive testing logic
    const [questionDifficulties, setQuestionDifficulties] = useState<Record<string, number>>({})

    // Timer effect
    useEffect(() => {
        if (!quizStarted) return

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer)
                    handleQuizSubmit()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [quizStarted])

    // Handle option selection
    const handleOptionSelect = (optionId: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [mockQuestions[currentQuestionIndex].id]: optionId
        }))
    }

    // Move to next question or submit quiz
    const handleNextQuestion = () => {
        if (currentQuestionIndex < mockQuestions.length - 1) {
            // Adaptive difficulty adjustment logic
            const currentQuestion = mockQuestions[currentQuestionIndex]
            const selectedOptionId = selectedOptions[currentQuestion.id]

            // Simple adaptive logic - adjust difficulty based on selection
            setQuestionDifficulties(prev => ({
                ...prev,
                [currentQuestion.id]: selectedOptionId === '0' ? -1 : 1
            }))

            setCurrentQuestionIndex(prev => prev + 1)
        } else {
            handleQuizSubmit()
        }
    }

    // Submit quiz and navigate to results
    const handleQuizSubmit = () => {
        // Calculate score and other metrics
        const totalQuestions = mockQuestions.length
        const correctAnswers = mockQuestions.filter(
            q => selectedOptions[q.id] === '0' // Assuming first option is correct for mock data
        ).length

        navigate('/results', {
            state: {
                totalQuestions,
                correctAnswers,
                selectedOptions,
                timeSpent: 45 * 60 - timeRemaining,
                questionDifficulties
            }
        })
    }

    // If quiz hasn't started, show start screen
    if (!quizStarted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Quiz Instructions</h1>
                    <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
                        <li>• Total Questions: {mockQuestions.length}</li>
                        <li>• Time Limit: 45 minutes</li>
                        <li>• Each question has 4 options</li>
                        <li>• You cannot go back to previous questions</li>
                    </ul>
                    <Button
                        size="lg"
                        onClick={() => setQuizStarted(true)}
                    >
                        Start Quiz
                    </Button>
                </div>
            </div>
        )
    }

    // Render current question
    return (
        <QuizQuestion
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={mockQuestions.length}
            question={mockQuestions[currentQuestionIndex].text}
            options={mockQuestions[currentQuestionIndex].options}
            selectedOption={selectedOptions[mockQuestions[currentQuestionIndex].id] || null}
            onSelectOption={handleOptionSelect}
            onSubmit={handleNextQuestion}
            timeRemaining={timeRemaining}
        />
    )
};

export default QuizPage