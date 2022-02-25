import { useState, useEffect } from "react";

function CardContainer({ isAction, isEndOfGame, children }) {
    const [cssClassName, setCssClassName] = useState("");

    useEffect(() => {
        if (isAction && isEndOfGame)
            setCssClassName(
                "qa-Card__container--action qa-Card__container--endGame"
            );
        else if (isAction) setCssClassName("qa-Card__container--action");
        else if (isEndOfGame) setCssClassName("qa-Card__container--endGame");
    }, [isAction, isEndOfGame]);
    return (
        <div className={`qa-Card__container ${cssClassName}`}>{children}</div>
    );
}

export default CardContainer;
