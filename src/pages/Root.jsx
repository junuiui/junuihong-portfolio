import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", "G-XXXX", {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);
    return (
        <>
            <MainNavigation />
            <main className="font-mono">
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
