import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What is the main cause of global warming?",
    options: ["Deforestation", "Burning fossil fuels", "Plastic waste", "Overfishing"],
    answer: "Burning fossil fuels",
    explanation: "Burning fossil fuels releases carbon dioxide, which traps heat in the atmosphere."
  },
  {
    question: "What gas do trees absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
    explanation: "Trees absorb carbon dioxide and help reduce global warming."
  },
  // Add 8 more questions following the same format
];

export default function ClimateQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (option) => {
    setAnswers([...answers, { question: questions[currentQuestion].question, chosen: option, correct: option === questions[currentQuestion].answer }]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const correctAnswers = answers.filter(a => a.correct).length;
  const message = correctAnswers >= 5 ? "Great job! You are a climate hero!" : "You are going to destroy mother nature! Learn more and try again!";

  return (
    <div className="flex flex-col items-center p-6">
      {!showResults ? (
        <Card className="w-full max-w-lg p-6">
          <Progress value={(currentQuestion + 1) * 10} className="mb-4" />
          <motion.h2 className="text-xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {questions[currentQuestion].question}
          </motion.h2>
          <div className="grid gap-2">
            {questions[currentQuestion].options.map((option) => (
              <Button key={option} onClick={() => handleAnswer(option)}>{option}</Button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="w-full max-w-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">{message}</h2>
          {answers.map((a, index) => (
            <div key={index} className="mb-4">
              <p><strong>Q:</strong> {a.question}</p>
              <p><strong>Your Answer:</strong> {a.chosen} {a.correct ? "✅" : "❌"}</p>
              {!a.correct && <p><strong>Correct Answer:</strong> {questions[index].answer}</p>}
              <p className="text-sm text-gray-600">{questions[index].explanation}</p>
            </div>
          ))}
          <Button onClick={() => { setAnswers([]); setCurrentQuestion(0); setShowResults(false); }}>Try Again</Button>
        </Card>
      )}
    </div>
  );
}
