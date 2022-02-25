function ButtonPrimary({ tryAgain, content }) {
    return (
        <button className="qa-Button__primary" onClick={tryAgain}>
            {content}
        </button>
    );
}

export default ButtonPrimary;
