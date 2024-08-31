import axios from "axios";

// Define the base URL of your API
const BASE_URL = "https://api.example.com";

// Function to fetch data
const fetchData = async (): Promise<ApiResponse[]> => {
    try {
        const response = await axios.get<ApiResponse[]>(`${BASE_URL}/endpoint`);
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Example usage
fetchData().then((data) => {
    console.log("Fetched data:", data);
});
