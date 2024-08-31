import axios from "axios";

// Define the base URL of your API
const BASE_URL = "https://cards-against-the-machine-back-end.onrender.com";

interface IGetBlackCard {
    Data: { BlackCard: string };
}

interface IGetWhiteCards {
    Data: Array<Object>;
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

export const getWhiteCards = async (): Promise<IGetWhiteCards[]> => {
    const url = `${BASE_URL}/get_white_cards`;
    try {
        const response = await axios.get<IGetWhiteCards[]>(url);
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    }
};
