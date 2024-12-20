import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Language from "./Language";
interface UserData {
    token: string;
    fullName: string;
    username: string;
    role: string;
  }

const Header: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<string>("");
    const [userData, setUserData] = useState<UserData | null>(null);
    const { t } = useTranslation();



    useEffect(() => {
            const storedUser = sessionStorage.getItem("loggedInUser");
            if (storedUser) {
                try {
                    setLoggedInUser(storedUser)
                    const parsedUser = JSON.parse(storedUser);
                    setUserData(parsedUser);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
        }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser("");
        router.push("/");
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="text-lg font-semibold text-gray-800">
                    {t("header.logo")}
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
                    >
                        {t("header.nav.home")}
                    </Link>
                    <Link
                        href="/car_acquisition"
                        className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
                    >
                        {t("header.nav.cars")}
                    </Link>
                    {loggedInUser && (
                        <Link
                            href="/appointment"
                            className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
                        >
                            Appointment
                        </Link>
                    )}
                    {loggedInUser && userData?.role === "ADMIN" && (
                        <Link
                            href="/trades"
                            className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
                        >
                            {t("header.nav.view_trades")}
                        </Link>
                    )}
                    {loggedInUser && userData?.role === "CUSTOMER" && (
                        <Link
                            href="/trade-in"
                            className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
                        >
                            {t("header.nav.trade_in")}
                        </Link>
                    )}
                    {!loggedInUser && (
                        <Link
                            href="/login"
                            className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
                        >
                            {t("header.nav.login")}
                        </Link>
                    )}
                    {loggedInUser && (
                        <a
                            href="#"
                            onClick={handleLogout}
                            className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
                        >
                            {t("header.nav.logout")}
                        </a>
                    )}
                    {loggedInUser && (
                        <div className="text-gray-800 font-medium">
                            {t("header.nav.welcome")}
                        </div>
                    )}
                    <Language />
                </nav>
            </div>
        </header>
    );

}

export default Header;