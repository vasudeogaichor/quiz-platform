interface UserResponse {
  questionId: string;
  isCorrect: boolean;
  // questionDifficulty: number;
  difficultyAttempted: number
}

interface Question {
  _id: string;
  topic: string;
  difficulty: number;
}

export class CATEngine {
  private defaultDifficulty: number;
  private difficultyStep: number;

  constructor() {
    this.defaultDifficulty = 5; // Scale of 1-10
    this.difficultyStep = 1;
  }

  // Estimate student's ability based on previous responses
  estimateAbility(responses: UserResponse[]): number {
    if (!responses.length) return this.defaultDifficulty;

    const correctAnswers = responses.filter((r) => r.isCorrect).length;
    const totalAnswers = responses.length;
    const successRate = correctAnswers / totalAnswers;

    // Calculate weighted average of question difficulties
    const weightedDifficulty =
      responses.reduce((acc, response) => {
        return (
          acc + response.difficultyAttempted * (response.isCorrect ? 1 : -0.5)
        );
      }, 0) / totalAnswers;

    return weightedDifficulty * 0.7 + successRate * 10 * 0.3;
  }

  // Calculate information function for Item Response Theory
  calculateInformation(question: Question, ability: number): number {
    const a = 1.0; // discrimination parameter
    const b = question.difficulty; // difficulty parameter
    const c = 0.2; // guessing parameter

    const p = c + (1 - c) / (1 + Math.exp(-a * (ability - b)));
    const q = 1 - p;
    return Math.pow(a, 2) * Math.pow(q / p, 2) * p;
  }

  async selectNextQuestion(
    userResponses: UserResponse[],
    availableQuestions: Question[],
    topics: string[]
  ): Promise<Question | null> {
    const currentAbility = this.estimateAbility(userResponses);
    // console.log('currentAbility - ', currentAbility)

    // Filter questions not yet answered
    const answeredIds = new Set(userResponses.map((r) => r.questionId));
    const candidates = availableQuestions.filter(
      (q) => !answeredIds.has(q._id) && topics.includes(q.topic)
    );

    if (!candidates.length) return null;

    // Calculate information value for each candidate question
    const questionScores = candidates.map((question) => ({
      question,
      info: this.calculateInformation(question, currentAbility),
    }));

    // Select question with maximum information
    questionScores.sort((a, b) => b.info - a.info);
    return questionScores[0].question;
  }

  // Update question parameters based on response patterns
  async updateQuestionParameters(
    question: Question,
    responses: UserResponse[]
  ): Promise<Question | undefined> {
    const totalAttempts = responses.length;
    if (totalAttempts < 10) return; // Need minimum responses for adjustment

    const correctRate =
      responses.filter((r) => r.isCorrect).length / totalAttempts;

    // Adjust difficulty based on response patterns
    let difficultyAdjustment = 0;
    if (correctRate > 0.8) difficultyAdjustment = 0.5;
    else if (correctRate < 0.2) difficultyAdjustment = -0.5;

    return {
      ...question,
      difficulty: Math.max(
        1,
        Math.min(10, question.difficulty + difficultyAdjustment)
      ),
    };
  }
}
