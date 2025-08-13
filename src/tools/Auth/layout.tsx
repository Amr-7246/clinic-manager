// Wrapp the chiled with that provider at your app . . . 
// <UserInfoContextProvider> { child } </UserInfoContextProvider>

import { UserInfoContextProvider } from "./context/userInfoContext";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <UserInfoContextProvider>
                {children}
            </UserInfoContextProvider>
        </section>
    );
}