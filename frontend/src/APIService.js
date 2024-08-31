import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function postFunction(){
    const response = await axios.post(`${API_URL}/`, {
        email: '',
        password: ''
    });
    return response.data;
}
