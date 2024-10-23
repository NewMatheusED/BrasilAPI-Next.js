interface HeaderTitleProps {
    title: string;
}

export default function HeaderTitle({ title }: HeaderTitleProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
        </div>
    );
}