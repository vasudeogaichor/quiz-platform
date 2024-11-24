import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { formatTimeToString } from "@/lib/utils";

interface TopicPerformance {
  topic: string;
  score: number;
  // improvement: number;
}

interface Recommendation {
  topic: string;
  message: string;
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  recommendations: Recommendation[];
  topicPerformances: TopicPerformance;
  timeSpent: number;
}

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log('state - ', state)
  const { totalQuestions, correctAnswers, score, recommendations, timeSpent, topicPerformances } = state as QuizResult;
  const resultParams = {
    totalQuestions, correctAnswers, score, recommendations, timeSpent, topicPerformances
  };

  // console.log('result params - ', resultParams)

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-yellow-100 mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
          <p className="text-gray-500">Here's how you performed</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg text-gray-500 mb-2">Total Score</h3>
              <p className="text-4xl font-bold">{resultParams.score}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg text-gray-500 mb-2">Time Spent</h3>
              <p className="text-4xl font-bold">{formatTimeToString(resultParams.timeSpent)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg text-gray-500 mb-2">Correct Answers</h3>
              <p className="text-4xl font-bold">
                {resultParams.correctAnswers}/{resultParams.totalQuestions}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Topic Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Topic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(resultParams.topicPerformances || {}).map(([topic, performance]) => (
                  <div key={topic}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="font-medium">{topic}</span>
                        <div className="ml-2 flex items-center">
                          {/* {topic.improvement > 0 ? (
                            <ArrowUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-500" />
                          )} */}
                          <span
                          // className={`text-sm ml-1 ${
                          //   topic.improvement > 0
                          //     ? "text-green-500"
                          //     : "text-red-500"
                          // }`}
                          >
                            {/* {Math.abs(topic.improvement)}% */}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium">
                        {performance}%
                      </span>
                    </div>
                    <Progress value={performance} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Improvement Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <ul className="space-y-4">
                {resultParams.recommendations?.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{suggestion}</span>
                  </li>
                ))}
              </ul> */}

              {resultParams.recommendations &&
              resultParams.recommendations.length > 0 ? (
                <ul className="space-y-4">
                  {resultParams.recommendations.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{suggestion.message}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>No suggestions from us. You did great!</span>
                  <span
                    role="img"
                    aria-label="thumbs-up"
                    className="text-blue-600"
                  >
                    👍
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate("/quiz")}>Start New Quiz</Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
