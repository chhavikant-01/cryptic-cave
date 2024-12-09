import { logout } from "../redux/user/userSlice";


export const isTokenValid = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/auth`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if(res.ok){
        return true;
    } else {
        logout();
        return false;
    }
}