import "../styles/dashboard.css";
import Card from "./Card";
import Prompt from "./Prompt";

interface CardItem {
    id: number;
    answer: string;
}

interface DashboardProps {
    cardArray: CardItem[];
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
                    <Card key={x.id} answer={x.answer} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
