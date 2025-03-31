import { useContext, useEffect } from "react";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/components/Loading/index";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <Loading />;
    }

    return user ? children : null;
};

export default ProtectedRoute;
