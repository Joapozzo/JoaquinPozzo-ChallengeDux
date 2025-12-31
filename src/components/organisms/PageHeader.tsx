import { Button } from "primereact/button";

interface PageHeaderProps {
    title: string;
    buttonLabel: string;
    buttonIcon: string;
    buttonOnClick: () => void;
}

const PageHeader = ({ title, buttonLabel, buttonIcon, buttonOnClick }: PageHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <Button label={buttonLabel} icon={buttonIcon} onClick={buttonOnClick}/>
        </div>
    )
}

export default PageHeader;