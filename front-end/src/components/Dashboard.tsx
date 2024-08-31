import "../styles/dashboard.css";
import Card from "./Card";
import Prompt from "./Prompt";

interface DashboardProps {
    cardArray: string[];
    promptStr: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ cardArray, promptStr }) => {
    return (
        <div className="dashboard">
            <div className="prompt-container">
                <Prompt prompt={promptStr || ""} />
            </div>
            <div className="cards-container">
                {cardArray.map((x) => (
                    <Card answer={x} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
