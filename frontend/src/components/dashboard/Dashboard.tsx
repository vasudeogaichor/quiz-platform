import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Trophy, Clock, Activity } from 'lucide-react';
import { useUserStore } from '@/store';

interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  completedToday: number;
  streakDays: number;
}

interface RecentQuiz {
  id: string;
  topic: string;
  score: number;
  date: string;
}

const DashboardPage = () => {
  const { userStats } = useUserStore();
  console.log('DashboardPage user  -', userStats)

  const stats: QuizStats = {
    totalQuizzes: userStats?.totalQuizzes ?? 0,
    averageScore: userStats?.averageScore ?? 0,
    completedToday: userStats?.completedToday ?? 0,
    streakDays: userStats?.streakDays ?? 0
  };

  const recentQuizzes: RecentQuiz[] = [
    { id: '1', topic: 'Algebra', score: 85, date: '2024-03-15' },
    { id: '2', topic: 'Geometry', score: 70, date: '2024-03-14' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
        <Button>Start New Quiz</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Quizzes</p>
              <p className="text-2xl font-bold">{stats.totalQuizzes}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-2xl font-bold">{stats.averageScore}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Clock className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Today's Quizzes</p>
              <p className="text-2xl font-bold">{stats.completedToday}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Activity className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Day Streak</p>
              <p className="text-2xl font-bold">{stats.streakDays}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuizzes.map(quiz => (
                <div key={quiz.id} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{quiz.topic}</h3>
                    <span className="text-sm text-gray-500">{quiz.date}</span>
                  </div>
                  <Progress value={quiz.score} />
                  <p className="text-sm text-right mt-1">{quiz.score}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Algebra</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Geometry</span>
                  <span className="text-sm">70%</span>
                </div>
                <Progress value={70} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;