import type { Metadata } from "next";
import "./globals.css";
import GlobalNav from "./components/navigation/GlobalNavBar";
import QueryProviders from "@/lib/ReactQuery/QueryProvider";
import { Toaster } from "react-hot-toast";
import { UserInfoContextProvider } from "@/context/userInfoContext";
import LayerMask from './components/LayerMask'
import { DoctorsContextProvider } from "@/context/doctorsContext";

export const metadata: Metadata = {
  title: "prescripto",
  description: "احجز كشفك وانت مكانك",
  icons: {
    icon: '/logo.svg'
  }
};

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { locale: string }; }>) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <html lang={params.locale}>
      <body className={` pt-[10vh]`}>
        <DoctorsContextProvider>
          <UserInfoContextProvider>
            <QueryProviders>
              <LayerMask />
              <GlobalNav />
              <div className={`${pathname.includes('admin') ? "" : "page"}`}>
                <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
                {children}
              </div>
            </QueryProviders>
          </UserInfoContextProvider>
        </DoctorsContextProvider>
      </body>
    </html>
  );
}
