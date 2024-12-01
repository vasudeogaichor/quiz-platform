import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Option {
  id: string;
  text: string;
  char?: string;
}

interface QuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: Option[];
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
  onSubmit: () => void;
  timeRemaining: number;
  nextButtonDisabled: boolean
}

const OPTION_CHARS = ["A", "B", "C", "D"];

const QuizQuestion = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  onSelectOption,
  onSubmit,
  timeRemaining,
  nextButtonDisabled = false
}: QuestionProps) => {
  options = options.map((option, index) => ({...option, char: OPTION_CHARS[index]}))
  // console.log('options - ', options)

  
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium">
              Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <Progress value={(questionNumber / totalQuestions) * 100} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">{question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {options.map((option) => (
              <Button 
                key={option.id}
                variant={selectedOption === option.id ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => onSelectOption(option.id)}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4">
                    {option.char}
                  </span>
                  <span>{option.text}</span>
                </div>
              </Button>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* <Button variant="outline">Previous</Button> */}
            <Button 
              onClick={onSubmit}
              disabled={!selectedOption || nextButtonDisabled}
            >
              {questionNumber === totalQuestions ? 'Submit Quiz' : 'Next Question'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default QuizQuestion;