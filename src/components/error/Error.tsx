import './error.scss';

const Error: React.FC = () => {
    return (
        <div className="error">
            <p className="error__sign">!</p>
            <p className="error__strong">Error</p>
            <p>Try again</p>
        </div>
    )
}

export default Error;