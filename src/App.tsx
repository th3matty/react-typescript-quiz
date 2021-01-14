import React, { useState } from 'react';
import { fetchQuizQuestions } from './API'
//types
import { QuestionsState, Difficulty } from './API';
//components
import Questioncard from './components/Questioncard';
//styles 
import { Globalstyle, Wrapper } from './App.styles';



export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTION = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);


  const startTrivia = async () => {
    setLoading(true);
    setGameover(false);

    const newQuestion = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameover) {
      //user answer
      const answer = e.currentTarget.value;
      //check answer against correct answers
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswer(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // move on to next question if not last questions[number].
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTION) {
      setGameover(true)
    } else {
      setNumber(nextQuestion)
    }
  }


  return (
    <>
      <Globalstyle />
      <Wrapper>
        <h1> React Quiz</h1>
        {gameover || userAnswers.length === TOTAL_QUESTION ?
          (<button className="start" onClick={startTrivia}>Start</button>) : null}
        {!gameover ? <p className="score"> Score: {score} </p> : null}
        {loading && <p> Loading Questions...</p>}

        {!loading && !gameover && (
          <Questioncard
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTION}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswers={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameover && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
          <button className="next" onClick={nextQuestion}> Next Question</button>
        ) : null}
      </Wrapper>
      <Globalstyle />
    </>
  );
}

export default App;
