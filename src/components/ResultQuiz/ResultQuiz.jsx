import resultImg from "../../assets/images/undraw_winners.svg";
import ButtonPrimary from "../Button/ButtonPrimary/ButtonPrimary";

function ResultQuiz({ counterGoodAnswer, tryAgain }) {
    return (
        <div className="qa-resultQuiz__container">
            <img
                src={resultImg}
                alt="undraw winners"
                className="qa-resultQuiz__container--img"
            />

            <h2>Results</h2>

            <p className="qa-resultQuiz__container--result">
                You got <span>{counterGoodAnswer}</span> correct answers
            </p>

            <ButtonPrimary content="Try again" tryAgain={tryAgain} />
        </div>
    );
}

export default ResultQuiz;
