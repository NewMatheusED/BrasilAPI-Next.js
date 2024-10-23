interface InfoMessageProps {
    message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message }) => {
    return (
        <p className="text-blue-700 rounded relative" role="alert">
            {message}
        </p>
    );
};

export default InfoMessage;