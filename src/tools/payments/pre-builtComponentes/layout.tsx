"use client";

import { BookingProvider } from '@/context/BookingContext';
import Navbar from './components/Navbar';

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="min-h-screen bg-gradient-to-b from-rose-900 to-black">
            <Navbar />
            <main>
            <BookingProvider>
                {children}
            </BookingProvider>
            </main>
        </section>
    );
}