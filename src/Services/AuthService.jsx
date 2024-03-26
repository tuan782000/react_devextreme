import axios from "axios";
import handleError from "../Helpers/ErrorHandler.jsx"

const api = "http://localhost:5020/api/"

export const loginAPI = async (username, password) => {
    try {
        const data = await axios.post(api + "account/login", {
            username: username,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}
export const registerAPI = async (email, username, password) => {
    try {
        const data = await axios.post(api + "account/register", {
            email: email,
            username: username,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}