import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import OnboardingPage from "../pages/Onboarding";
import { LogOut } from "../pages/Logout";

export const ProtectedRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    if(!currentUser) {
        return <Navigate to="/login" />
    };
    if(currentUser && currentUser.isOnboarded === false) {
        return <OnboardingPage />
    }
    if(currentUser && currentUser.isOnboarded) {
        return <Outlet />
    }else{
        return <LogOut />   
    }
}