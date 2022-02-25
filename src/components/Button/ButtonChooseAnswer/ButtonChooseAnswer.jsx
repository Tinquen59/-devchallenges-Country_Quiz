import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function ButtonChooseAnswer({ pressButton, isChosenAnswer, answer }) {
    const [cssBtnClass, setCssBtnClass] = useState("");
    const [goodResponse, setGoodResponse] = useState(false);
    const [badResponse, setBadResponse] = useState(false);

    useEffect(() => {
        answer?.isCorrect ? setGoodResponse(true) : setGoodResponse(false);

        answer?.isError ? setBadResponse(true) : setBadResponse(false);
    }, [answer]);

    useEffect(() => {
        if (cssBtnClass) setCssBtnClass("");

        if (goodResponse) setCssBtnClass("qa-Button__chooseAnswer--correct");

        if (badResponse) setCssBtnClass("qa-Button__chooseAnswer--error");
    }, [cssBtnClass, goodResponse, badResponse]);

    return (
        <button
            className={`qa-Button__chooseAnswer ${cssBtnClass}`}
            disabled={isChosenAnswer}
            onClick={() => pressButton(answer.value)}
        >
            <div>
                <span className="qa-Button__chooseAnswer--numbering">
                    {answer.letter}
                </span>
                <span className="qa-Button__chooseAnswer--answer">
                    {answer.value}
                </span>
            </div>

            {goodResponse && (
                <FontAwesomeIcon
                    className="qa-Button__chooseAnswer--icon"
                    icon={faCheck}
                />
            )}
            {badResponse && (
                <FontAwesomeIcon
                    className="qa-Button__chooseAnswer--icon"
                    icon={faXmark}
                />
            )}
        </button>
    );
}

export default ButtonChooseAnswer;
