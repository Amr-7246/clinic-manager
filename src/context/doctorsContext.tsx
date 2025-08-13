"use client"
import { doctor } from "@/types/doctorTypes";
import { ReactNode, useContext, useState, createContext } from "react";

// ~ ######### User Info Context tybe
    interface AuthContextType {
      Doctors: null | undefined | doctor[] ;
      setDoctors: (doctor: doctor[] | null | undefined) => void;
    }
// ~ ######### User Info Context tybe
// ~ ######### User Info Context itself
    const DoctorsContext = createContext<AuthContextType|undefined> (undefined)
    export const DoctorsContextProvider = ({ children }: { children: ReactNode }) => {

        const [Doctors, setDoctors] = useState<doctor[] | null | undefined >(null)

        return (
            <DoctorsContext.Provider value={{Doctors, setDoctors }} >
                {children}
            </DoctorsContext.Provider>
        )  
    }
// ~ ######### User Info Context itself
// ~ ######### Hook to use Context
    export const useDoctorsContext = () => {
        const context = useContext(DoctorsContext);
        if (!context) {
            throw new Error("useAuth must be used inside an AuthProvider");
        }
        return context;
    }
// ~ ######### Hook to use Context
