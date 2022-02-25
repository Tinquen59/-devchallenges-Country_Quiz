import ButtonChooseAnswer from "../../components/Button/ButtonChooseAnswer/ButtonChooseAnswer";
import ButtonThird from "../Button/ButtonBasic/ButtonThird";

import CardImgAdventure from "../../assets/images/undraw_adventure_4hum 1.svg";

function GameQuiz({
    questionAnswer,
    pressButton,
    isChosenAnswer,
    nextQuestion,
}) {
    return (
        <>
            <img
                src={CardImgAdventure}
                alt="adventure"
                className="qa-GameQuiz--imgAdventure"
            />

            {questionAnswer.flag && (
                <img
                    src={questionAnswer.flag}
                    alt="adventure"
                    className="qa-GameQuiz--flag"
                />
            )}

            <p className="qa-GameQuiz--question">{questionAnswer.question}</p>

            {questionAnswer.allAnswer.map((answer, index) => (
                <ButtonChooseAnswer
                    pressButton={pressButton}
                    isChosenAnswer={isChosenAnswer}
                    answer={answer}
                    key={index}
                />
            ))}

            {isChosenAnswer && (
                <div className="qa-GameQuiz__rightBtn">
                    <ButtonThird clickFunction={nextQuestion} content="Next" />
                </div>
            )}
        </>
    );
}

export default GameQuiz;
