import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Resgiter";
import Overview from "./pages/overviewPrimary/Overview";   
import AccountSettings from "./pages/Configuration/Configuration";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landinpage from "./pages/Landinpage/Landigpage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redireciona a raiz para /landingpage */}
                <Route path="/" element={<Navigate to="/landingpage" />} />

                <Route path="/landingpage" element={<Landinpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/overview" 
                    element={
                        <ProtectedRoute>
                            <Overview />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/analytics" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/settings" 
                    element={
                        <ProtectedRoute>
                            <AccountSettings />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}
