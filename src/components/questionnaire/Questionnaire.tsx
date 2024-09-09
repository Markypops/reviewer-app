"use client"

import { useState, useEffect } from "react"
import { Card } from 'primereact/card'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { FluidMechanicsData } from '../../assets/FluidMechanics';
import MassTransferData from '../../assets/MassTransfer.json';
import ChemicalEngineeringThermodynamicsData from '../../assets/ChemicalEngineeringThermodynamics.json';
import ProcessEquipmentAndPlantDesignData from '../../assets/ProcessEquipmentAndPlantDesign.json';
import HeatTransferData from '../../assets/HeatTransfer.json';
import MechanicalOperationsData from '../../assets/MechanicalOperations.json';
import { Button } from 'primereact/button';

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
  topic: string,
  section: string;
  onClickChooseTopic: (visible: boolean) => void;
}


const Questionnaire = (
  {
    topic,
    section,
    onClickChooseTopic
  } :QuestionnaireProps) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [quizEnded, setQuizEnded] = useState(false)

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

      setQuestions(data);
  }, [topic, section]);

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (selectedAnswer !== null) {
      timer = setTimeout(() => {
        handleNextQuestion()
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [selectedAnswer])

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer)
      const correct = answer === questions[currentQuestion].Answer
      setIsCorrect(correct)
      if (correct) {
        setScore(score + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    } else {
      setQuizEnded(true)
    }
  }

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
    )
  }

  if (quizEnded) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">Your final score: {score} out of {questions.length}</p>
        <p className="text-lg">Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Question {question.Number}</h2>
      <p className="text-lg mb-4">{question.Question}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['A', 'B', 'C', 'D'].map((choice) => (
          <Card 
            key={choice}
            className={`cursor-pointer transition-all ${
              selectedAnswer === choice
                ? isCorrect
                  ? 'shadow-lg border-green-500 border-2'
                  : 'shadow-lg border-red-500 border-2'
                : selectedAnswer === null ? 'hover:shadow-md' : ''
            }`}
            onClick={() => handleAnswerClick(choice)}
          >
            <div className="p-4">
              <p className="font-semibold">{choice}: {question[choice as keyof typeof question]}</p>
            </div>
          </Card>
        ))}
      </div>
      {selectedAnswer && (
        <div className="mt-4">
          <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect. The answer is ' + questions[currentQuestion].Answer}
          </p>
        </div>
      )}
      <p className="text-lg">Current Score: {score} out of {currentQuestion + 1}</p>
    </div>
  )
}

export default Questionnaire;