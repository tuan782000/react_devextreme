/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from 'react-toastify'
import axios from "axios";


const UserContext = createContext({

});

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (email, username, password) => {
        await registerAPI(email, username, password).then((res) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj);
                toast.success("Login Success!");
                navigate("/product");
            }
        })
            .catch((e) => toast.warning("Server error occurred"));
    }

    const loginUser = async (username, password) => {
        await loginAPI(username, password).then((res) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj);
                toast.success("Login Success!");
                navigate("/product");
            }
        })
            .catch((e) => toast.warning("Server error occurred"));
    }

    const isLoggedIn = () => {
        return !!user;
    }
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        toast.error("Logout Success!");
        navigate("/");
    }

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => React.useContext(UserContext);