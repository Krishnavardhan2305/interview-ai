import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {

        setLoading(true);

        const data = await login({ email, password });

        setUser(data.user);
        setLoading(false);
    };

   const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    console.log("data came to hooks");
    const data = await register({
        username,
        email,
        password
    });
    setUser(data.user);
    setLoading(false);
    return data;
};
    const handleLogout = async () => {

        setLoading(true);

        await logout();

        setUser(null);

        setLoading(false);
    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};