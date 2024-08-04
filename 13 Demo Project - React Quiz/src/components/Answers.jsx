import { useRef } from "react";

export default function Answers({ answers, selectedAnswers, answerState, onSelect }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map (answer => {
        const isSelected = selectedAnswers === answer;
        let cssClasses = '';
        
        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected';
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
          cssClasses = answerState;
        }

        return <li key={answer} className='answer'>
          <button onClick={() => onSelect(answer)} className={cssClasses} disabled={answerState !== ''}>{answer}</button>
        </li>;
      }
      )}
    </ul>
  );
}