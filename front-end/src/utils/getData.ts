import axios from "axios";

// Define the base URL of your API
const BASE_URL = "https://cards-against-the-machine-back-end.onrender.com";

interface IGetBlackCards {
    Data: { BlackCard: string };
}

interface IGetWhiteCards {
    Data: Array<Object>;
}

// Function to fetch data
export const getBlackCards = async (): Promise<IGetBlackCards[]> => {
    const url = `${BASE_URL}/get_black_cards`;
    try {
        const response = await axios.get<IGetBlackCards[]>(url);
        return response.data;
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
