import "../styles/navbar.css";

interface INavbar {
    rating: string;
    handleSetRating: (rating: string) => void;
}

const Navbar: React.FC<INavbar> = ({ rating, handleSetRating }) => {
    return (
        <div className="navbar">
            <div className="navbar-title">Cards Against the Machine</div>
            <div className="navbar-buttons">
                <button
                    className={rating === "kids" ? "activated" : ""}
                    onClick={() => handleSetRating("kids")}
                >
                    Kids
                </button>
                <button
                    className={rating === "adults" ? "activated" : ""}
                    onClick={() => handleSetRating("adults")}
                >
                    Adults
                </button>
            </div>
        </div>
    );
};

export default Navbar;
