import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import OnboardingPage from "../pages/Onboarding";
import { LogOut } from "../pages/Logout";
import { isTokenValid } from "../utils/isTokenValid";

export const ProtectedRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    const isAuthenticated = () => {
        if(!currentUser) {
            return false;
        }else{
            return isTokenValid();
        }
    }

    if(!isAuthenticated()) {
        return <Navigate to="/login" />
    };
    if(isAuthenticated && currentUser.isOnboarded === false) {
        return <OnboardingPage />
    }
    if(isAuthenticated && currentUser.isOnboarded) {
        return <Outlet />
    }else{
        return <LogOut />   
    }
}