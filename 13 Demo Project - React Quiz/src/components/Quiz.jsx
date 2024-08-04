import { useCallback, useState } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  
  const activeQuestionIndex = answerState === '' ?  userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }
      
      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  }, [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return  <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Complete!</h2>
    </div>
  }

  

  return (
    <div id="quiz">
      <Question 
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}