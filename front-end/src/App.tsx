import "./styles/app.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import { getBlackCards, getWhiteCards } from "./utils/getData";

const arrayToTen = Array.from({ length: 6 }, (_, index) => index);

const App = () => {
    const cardArr = arrayToTen.map((x) => ({
        id: x,
        answer: `This is answer ${x}`,
    }));
    return (
        <div className="app">
            <Navbar />
            <Dashboard cardArray={cardArr} />
        </div>
    );
};

export default App;
