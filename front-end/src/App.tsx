import "./styles/app.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import { useState, useEffect } from "react";

import { getBlackCards, getWhiteCards } from "./utils/getData";

const App = () => {
    const [promptStr, setPromptStr] = useState<string | null>(null);
    const [cardArr, setCardArr] = useState<string[] | undefined>(undefined);
    const [rating, setRating] = useState<string>("kids");

    console.log(`rating: ${rating}`);

    const handleSetRating = (newRating: string) => {
        setRating(newRating);
    };

    // Function to fetch both black card and white cards
    const fetchCards = async () => {
        try {
            const blackCard = await getBlackCards();
            setPromptStr(blackCard); // Assuming getBlackCards() returns a string

            const cards = await getWhiteCards(rating);
            setCardArr(cards); // Assuming getWhiteCards() returns string[]
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchCards();
    }, [rating]);

    return (
        <div className="app">
            <Navbar rating={rating} handleSetRating={handleSetRating} />
            <button onClick={fetchCards}>Refresh</button>{" "}
            {/* Button to trigger refresh */}
            {promptStr !== null &&
                cardArr && ( // Ensure cardArr is not undefined before rendering Dashboard
                    <Dashboard cardArray={cardArr} promptStr={promptStr} />
                )}
        </div>
    );
};

export default App;
