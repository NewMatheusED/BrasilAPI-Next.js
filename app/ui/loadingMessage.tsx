interface LoadingIndicatorProps {
    message: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({message}) => {
    return (
        <div className="flex flex-col">
            <div className="spinner"></div>
            <p className="text-blue-500 mt-2">{message}</p>
        </div>
    );
};

export default LoadingIndicator;