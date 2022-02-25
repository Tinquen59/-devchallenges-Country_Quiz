function ButtonThird({ clickFunction, content }) {
    return (
        <button className="qa-Button__third" onClick={clickFunction}>
            {content}
        </button>
    );
}

export default ButtonThird;
