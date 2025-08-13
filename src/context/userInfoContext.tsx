"use client"
import { IPatient } from "@/types/patientTypes";
import { ReactNode, useContext, useState, createContext, useEffect } from "react";

// ~ ######### User Info Context tybe
    interface AuthContextType {
        UserInfo: IPatient | null;
        setUserInfo: (user: IPatient | null) => void | any;
        login: (userData: IPatient, token: string) => void;
        ClientLogout: () => void;
    }
// ~ ######### User Info Context tybe
// ~ ######### User Info Context itself
    const UserInfoContext = createContext<AuthContextType|undefined> (undefined)
    export const UserInfoContextProvider = ({ children }: { children: ReactNode }) => {

        const [UserInfo, setUserInfo] = useState<IPatient | null >(null)
        useEffect(() => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) setUserInfo(JSON.parse(storedUser));
        }, []);

        const login = (userData: IPatient, token: string) => {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("accessToken", token);
          setUserInfo(userData);
        };

          const ClientLogout = () => {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          setUserInfo(null);
        };

        return (
            <UserInfoContext.Provider value={{UserInfo, setUserInfo , login , ClientLogout }} >
                {children}
            </UserInfoContext.Provider>
        )
    }
// ~ ######### User Info Context itself
// ~ ######### Hook to use Context
    export const useUserInfoContext = () => {
        const context = useContext(UserInfoContext);
        if (!context) {
            throw new Error("useAuth must be used inside an AuthProvider");
        }
        return context;
    }
// ~ ######### Hook to use Context
