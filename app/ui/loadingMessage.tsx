interface LoadingIndicatorProps {
    message: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({message}) => {
    return <p className="text-blue-500">{message}</p>;
};

export default LoadingIndicator;