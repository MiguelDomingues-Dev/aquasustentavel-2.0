import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Resgiter";
import Overview from "./pages/Overview/overview";   
import Landinpage from "./pages/Landinpage/landigpage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota padrão que redireciona para a Landinpage */}
                <Route path="/" element={<Navigate to="/landinpage" />} />
                
                <Route path="/landinpage" element={<Landinpage />} />
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
            </Routes>
        </BrowserRouter>
    );
}
