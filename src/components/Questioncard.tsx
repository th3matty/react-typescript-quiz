import react from 'react';
import {AnswerObject} from '../App'
// Styles
import { Wrapper, ButtonWrapper } from './Question.stye';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswers: AnswerObject | undefined;
    questionNr: number;
    totalQuestion: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswers,
    questionNr,
    totalQuestion,
  }) => (
    <Wrapper>
      <p className='number'>
        Question: {questionNr} / {totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswers?.correctAnswer === answer}
            userClicked={userAnswers?.answer === answer}
          >
            <button disabled={userAnswers ? true : false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );

export default QuestionCard;