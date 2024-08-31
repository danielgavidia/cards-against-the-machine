import "./styles/app.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import { useState, useEffect } from "react";

import { getBlackCards } from "./utils/getData";

const arrayToTen = Array.from({ length: 6 }, (_, index) => index);

const App = () => {
    const cardArr = arrayToTen.map((x) => ({
        id: x,
        answer: `This is answer ${x}`,
    }));

    const [promptStr, setPromptStr] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlackCard = async () => {
            try {
                const blackCard = await getBlackCards();
                setPromptStr(blackCard); // Adjust based on your actual response structure
            } catch (error) {
                console.error("Error fetching black card:", error);
            }
        };

        fetchBlackCard();
    }, []);

    return (
        <div className="app">
            <Navbar />
            {promptStr !== null && (
                <Dashboard cardArray={cardArr} promptStr={promptStr} />
            )}
        </div>
    );
};

export default App;
