interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="bg-zinc-800 text-zinc-100 h-screen p-6">
            {children}
        </div>
    );
};

export default Container;