import axios from "axios";

// Define the base URL of your API
const BASE_URL = "https://cards-against-the-machine-back-end.onrender.com";

interface IGetBlackCard {
    Data: { BlackCard: string };
}

interface IGetWhiteCardsResponse {
    Data: { [key: string]: string };
}

// Function to fetch data
export const getBlackCards = async (): Promise<string> => {
    const url = `${BASE_URL}/get_black_card`;
    try {
        const response = await axios.get<IGetBlackCard>(url);
        console.log(response.data.Data.BlackCard);
        return response.data.Data.BlackCard;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Function to fetch white cards and transform the data
export const getWhiteCards = async (): Promise<string[]> => {
    const url = `${BASE_URL}/get_white_cards`;
    try {
        const response = await axios.get<IGetWhiteCardsResponse>(url);
        const dataObject = response.data.Data;

        // Convert the object to an array of strings
        const whiteCardsArray = Object.values(dataObject).filter(
            (card) => card.trim() !== ""
        );

        return whiteCardsArray;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    }
};
