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
        <header className="header">
            <div className="header__logo">{t("header.logo")}</div>
            <nav className="header__nav">
                <Link href="/" className="header__link">
                    {t("header.nav.home")}
                </Link>
                <Link href="/car_acquisition" className="header__link">
                    Cars
                </Link>
                {(loggedInUser) && <Link href={"/appointment"}>Appointment</Link>}
                {(loggedInUser && userData?.role === 'ADMIN') && <Link href={"/trades"}>{t("header.nav.view_trades")}</Link>}
                {(loggedInUser && userData?.role === 'CUSTOMER') &&
                 <Link href="/trade-in" className="header__link">
                    {t("header.nav.trade_in")}
                </Link>}
                {!loggedInUser && (
                    <Link href="/login" className="header__link">
                        {t("header.nav.login")}
                    </Link>
                )}
                {loggedInUser && (
                    <a
                        href="#"
                        className="header__link"
                        onClick={handleLogout}
                    >
                        {t("header.nav.logout")}
                    </a>
                )}
                {loggedInUser && (
                    <div className="header__user">
                        {t("header.nav.welcome")}
                    </div>
                )}
                <Language />

            </nav>
        </header>
    );
}

export default Header;