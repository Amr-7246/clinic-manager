"use client"
import { ReactNode, useContext, useState, createContext, useEffect } from "react";
import { IBooking } from "../types/itemsTypes";

// ~ ######### Booking Info Context tybe

    interface AuthContextType {
        BookingInfo: IBooking | null;
        setBookingInfo: (Booking: IBooking | null) => void;
    }
// ~ ######### Booking Info Context tybe
// ~ ######### Booking Info Context itself
    const BookingContext = createContext<AuthContextType|undefined> (undefined)
    export const BookingProvider = ({ children }: { children: ReactNode }) => {

        const [BookingInfo, setBookingInfo] = useState<IBooking | null >(null)
      
        return (
            <BookingContext.Provider value={{BookingInfo, setBookingInfo  }} >
                {children}
            </BookingContext.Provider>
        )  
    }
// ~ ######### Booking Info Context itself
// ~ ######### Hook to use Context
    // export const useBooking = () => {
    //     const context = useContext(BookingContext);
    //     if (!context) {
    //         throw new Error("useAuth must be used inside an AuthProvider");
    //     }
    //     return context;
    // }
// ~ ######### Hook to use Context
