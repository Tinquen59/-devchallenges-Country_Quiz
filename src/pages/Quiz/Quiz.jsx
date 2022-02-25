import { useState, useEffect } from "react";
import axios from "axios";

import CardContainer from "../../components/CardContainer/CardContainer";
import Loader from "../../components/Loader/Loader";
import GameQuiz from "../../components/GameQuiz/GameQuiz";
import ResultQuiz from "../../components/ResultQuiz/ResultQuiz";

import randomInt from "../../utils/randomInt";

const allLetters = ["A", "B", "C", "D"];

function Quiz() {
    const [isAction, setIsAction] = useState(false);
    const [isChosenAnswer, setIsChosenAnswer] = useState(false);
    const [counterCorrectAnswer, setCounterCorrectAnswer] = useState(0);
    const [badAnswer, setBadAnswer] = useState(false);
    const [isEndOfGame, setIsEndOfGame] = useState(false);
    const [countryEU, setCountryEU] = useState([]);
    const [questionAnswer, setQuestionAnswer] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const DisplayQuizOrResult = () => {
        if (isEndOfGame) {
            return (
                <ResultQuiz
                    counterGoodAnswer={counterCorrectAnswer}
                    tryAgain={tryAgain}
                />
            );
        } else {
            return (
                <GameQuiz
                    questionAnswer={questionAnswer}
                    pressButton={pressButton}
                    isChosenAnswer={isChosenAnswer}
                    nextQuestion={nextQuestion}
                />
            );
        }
    };

    /**
     * Quand on clique sur une réponse
     * @param {*} value la valeur de la réponse (ex: France)
     */
    const pressButton = (value) => {
        const { correctAnswer, allAnswer } = questionAnswer;

        let tampAllAnswer = [];

        // si c'est une bonne réponse
        if (value === correctAnswer.value) {
            tampAllAnswer = allAnswer.map((answer) =>
                answer.value === value ? { ...answer, isCorrect: true } : answer
            );

            setCounterCorrectAnswer(counterCorrectAnswer + 1);
        } else {
            // si c'est une mauvaise réponse
            tampAllAnswer = allAnswer
                .map((answer) =>
                    answer.value === value
                        ? { ...answer, isError: true }
                        : answer
                )
                .map((answer) =>
                    answer.value === correctAnswer.value
                        ? { ...answer, isCorrect: true }
                        : answer
                );

            setBadAnswer(true);
        }

        setQuestionAnswer({ ...questionAnswer, allAnswer: tampAllAnswer });

        setIsAction(true);
        setIsChosenAnswer(true);
    };

    /**
     * Quand on clique sur le bouton "next"
     */
    const nextQuestion = () => {
        if (!badAnswer) {
            generateQuestionAnswer();
            setIsAction(false);
        } else {
            setIsEndOfGame(true);
        }

        setIsChosenAnswer(false);
    };

    const tryAgain = () => {
        setCounterCorrectAnswer(0);
        setBadAnswer(false);
        setIsEndOfGame(false);

        generateQuestionAnswer();
    };

    /**
     * Récupère les données de l'API
     */
    const getCountryEU = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                "https://restcountries.com/v3.1/subregion/europe?fields=name,flags,capital"
            );
            setCountryEU(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Vérifie les occurrences
     * @param {*} answers toutes les réponses
     * @param {*} country tous les pays
     * @param {*} randomID un nombre entier aléatoire
     * @returns un tableau avec le(s) occurrence(s)
     */
    const occurenceAnswers = (answers, country, randomID) => {
        return [...answers].filter(
            (answer) => answer.value === country[randomID].name.common
        );
    };

    /**
     * Génère toutes les réponses
     * @param {*} correctAnswer la bonne réponse
     * @returns toutes les réponses
     */
    const generateAllAnswer = (correctAnswer) => {
        const allAnswer = [];

        for (let i = 0; i < allLetters.length; i++) {
            if (i !== correctAnswer.letter) {
                let randomID = randomInt(countryEU.length);
                let occurrenceAllAnswer = occurenceAnswers(
                    allAnswer,
                    countryEU,
                    randomID
                );

                while (
                    occurrenceAllAnswer.length > 0 ||
                    countryEU[randomID].name.common === correctAnswer.value
                ) {
                    randomID = randomInt(countryEU.length);
                    occurrenceAllAnswer = occurenceAnswers(
                        allAnswer,
                        countryEU,
                        randomID
                    );
                }

                const { name } = countryEU[randomID];
                allAnswer.push({
                    letter: i,
                    value: name.common,
                });
            } else {
                allAnswer.push(correctAnswer);
            }
        }

        return allAnswer.map((answer) => ({
            ...answer,
            letter: allLetters[answer.letter],
        }));
    };

    /**
     * Génère le quiz
     */
    const generateQuestionAnswer = () => {
        const kindOfQuestion = randomInt(2); // détermine le genre de question aléatoirement
        const randomCountryID = randomInt(countryEU.length);
        const placeOfCorrectAnswer = randomInt(allLetters.length);

        const { flags, capital, name } = countryEU[randomCountryID];

        let dataQuestion = {};
        if (kindOfQuestion === 0) {
            dataQuestion = {
                question: `${capital} is the capital of`,
            };
        } else if (kindOfQuestion === 1) {
            dataQuestion = {
                flag: flags.png,
                question: "Which country does this flag belong to ?",
            };
        }

        const correctAnswer = {
            letter: placeOfCorrectAnswer,
            value: name.common,
        };

        setQuestionAnswer({
            ...dataQuestion,
            correctAnswer: {
                ...correctAnswer,
                letter: allLetters[placeOfCorrectAnswer],
            },
            allAnswer: generateAllAnswer(correctAnswer),
        });

        setIsLoading(false);
    };

    useEffect(() => {
        if (countryEU.length) generateQuestionAnswer();
    }, [countryEU]);

    useEffect(() => {
        getCountryEU();
    }, []);

    return (
        <section className="qa-Quiz__container">
            <div className="qa-Quiz__center">
                <h1 className="qa-Quiz__center--title">Country quiz</h1>
                <CardContainer isAction={isAction} isEndOfGame={isEndOfGame}>
                    {isLoading ? <Loader /> : DisplayQuizOrResult()}
                </CardContainer>
            </div>
        </section>
    );
}

export default Quiz;
