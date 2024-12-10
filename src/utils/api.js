import axios from "axios";

const api = axios.create({
    baseURL: "https://text-translator2.p.rapidapi.com",
    headers: {
        'x-rapidapi-key': '95ad9bd07amsh2bcb3d91a4a20c0p1869f9jsne71dbe1975ad',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
    }
})
export default api