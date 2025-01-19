import { useSelector } from "react-redux";
import NavBar from "../components/Navbar";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
    const {user,status} = useSelector((state: any) => state.userState);
    

    if(user?.token) return (
        <div>
            <NavBar />
            <Outlet/>
        </div>
    );

    else return <Navigate to='/'/>
}