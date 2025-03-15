import { BASE_API_URL } from "@/global";
import { getCookie } from "./client-cookies";
import { get } from "./api-bridge";

const getMenuCount = async (): Promise<number> => {
    try {
        const TOKEN = (await getCookie("token")) || "";
        const url = `${BASE_API_URL}/menu`; // Endpoint show all menu
        const response = await get(url, TOKEN);

        console.log("API Response:", response); // Debugging

        if (!response || !response.data) {
            console.log("Invalid API response", response);
            return 0;
        }

        // Hitung jumlah item dalam data
        const menus = response.data;
        return Array.isArray(menus) ? menus.length : 0;
    } catch (error) {
        console.log("Error fetching menu count:", error);
        return 0;
    }
};


export default getMenuCount