import { useState, useEffect, useMemo } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FluidMechanicsData } from '../../assets/FluidMechanics';
import MassTransferData from '../../assets/MassTransfer.json';
import ChemicalEngineeringThermodynamicsData from '../../assets/ChemicalEngineeringThermodynamics.json';
import ProcessEquipmentAndPlantDesignData from '../../assets/ProcessEquipmentAndPlantDesign.json';
import HeatTransferData from '../../assets/HeatTransfer.json';
import MechanicalOperationsData from '../../assets/MechanicalOperations.json';

interface Question {
  Number: number;
  Question: string;
  A: string | number;
  B: string | number;
  C: string | number;
  D: string | number;
  Answer: string;
}

interface QuestionnaireProps {
  topic: string;
  section: string;
  onClickChooseTopic: (visible: boolean) => void;
}

interface AnswerState {
  selected: string;
  isCorrect: boolean;
}

const Questionnaire = ({
  topic,
  section,
  onClickChooseTopic
}: QuestionnaireProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [answerStates, setAnswerStates] = useState<(AnswerState | null)[]>([]);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    let data: any;
    switch (topic) {
      case 'Fluid Mechanics':
        data = FluidMechanicsData[section as keyof typeof FluidMechanicsData] || [];
        break;
      case 'Mass Transfer':
        data = MassTransferData[section as keyof typeof MassTransferData] || [];
        break;
      case 'Chemical Engineering Thermodynamics':
        data = ChemicalEngineeringThermodynamicsData[section as keyof typeof ChemicalEngineeringThermodynamicsData];
        break;
      case 'Process Equipment and Plant Design':
        data = ProcessEquipmentAndPlantDesignData[section as keyof typeof ProcessEquipmentAndPlantDesignData];
        break;
      case 'Heat Transfer':
        data = HeatTransferData[section as keyof typeof HeatTransferData];
        break;
      case 'Mechanical Operations':
        data = MechanicalOperationsData[section as keyof typeof MechanicalOperationsData];
        break;
      default:
        data = [];
    }

    const shuffledData = shuffleArray(data);
    setQuestions(shuffledData);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizEnded(false);
    setAnswerStates(new Array(shuffledData.length).fill(null));
  }, [topic, section]);

  useEffect(() => {
    const currentAnswerState = answerStates[currentQuestionIndex];
    if (currentAnswerState !== null) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [answerStates, currentQuestionIndex]);

  const handleAnswerClick = (answer: string) => {
    if (answerStates[currentQuestionIndex] === null) {
      const isCorrect = answer === currentQuestion.Answer;
      const newAnswerStates = [...answerStates];
      newAnswerStates[currentQuestionIndex] = { selected: answer, isCorrect };
      setAnswerStates(newAnswerStates);
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = useMemo(() => questions[currentQuestionIndex] || {}, [questions, currentQuestionIndex]);
  const currentAnswerState = answerStates[currentQuestionIndex];

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md mx-4 shadow-lg">
          <div className="p-6 text-center">
            <i className="pi pi-book text-6xl text-blue-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Questions Available</h2>
            <p className="text-gray-600 mb-6">Please select a topic to begin the quiz.</p>
            <Button 
              label="Choose a Topic" 
              icon="pi pi-list" 
              className="p-button-rounded p-button-info"
              onClick={() => {onClickChooseTopic(true)}}
            />
          </div>
        </Card>
      </div>
    );
  }

  if (quizEnded) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">Your final score: {score} out of {questions.length}</p>
        <p className="text-lg">Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
        <Button 
          label="Restart Quiz" 
          icon="pi pi-refresh" 
          className="p-button-rounded p-button-success"
          onClick={() => {
            const shuffledData = shuffleArray(questions);
            setQuestions(shuffledData);
            setCurrentQuestionIndex(0);
            setScore(0);
            setQuizEnded(false);
            setAnswerStates(new Array(shuffledData.length).fill(null));
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <p className="text-lg mb-4">{currentQuestion.Question}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['A', 'B', 'C', 'D'].map((choice) => (
          <Card 
            key={choice}
            className={`cursor-pointer transition-all ${
              currentAnswerState?.selected === choice
                ? currentAnswerState.isCorrect
                  ? 'shadow-lg border-green-500 border-2'
                  : 'shadow-lg border-red-500 border-2'
                : 'hover:shadow-md'
            }`}
            onClick={() => handleAnswerClick(choice)}
          >
            <div className="p-4">
              <p className="font-semibold">{choice}: {currentQuestion[choice as keyof typeof currentQuestion]}</p>
            </div>
          </Card>
        ))}
      </div>
      {currentAnswerState && (
        <div className="mt-4">
          <p className={`text-lg font-bold ${currentAnswerState.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {currentAnswerState.isCorrect ? 'Correct!' : 'Incorrect. The answer is ' + currentQuestion.Answer}
          </p>
        </div>
      )}
      <p className="text-lg">Overall Score: {score} out of {questions.length}</p>
      <div className="flex justify-between mt-4">
        <Button 
          label="Previous" 
          icon="pi pi-chevron-left" 
          className="p-button-rounded p-button-secondary"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        />
        <Button 
          label="Next" 
          icon="pi pi-chevron-right" 
          iconPos="right"
          className="p-button-rounded p-button-secondary"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  );
};

export default Questionnaire;