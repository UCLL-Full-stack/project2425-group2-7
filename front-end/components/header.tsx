import Link from "next/link";
import { useEffect, useState } from "react";


const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string>("");

    useEffect(() => {
        const user = sessionStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser("");
    };

    return (
        <header className="header">
            <div className="header__logo">Dealership</div>
            <nav className="header__nav">
                <Link href="/" className="header__link">
                    Home
                </Link>
                <Link href="/car_acquisition" className="header__link">
                    Cars
                </Link>
                <Link href="/trade-in" className="header__link">
                    Trade your car
                </Link>
                {!loggedInUser && (
                    <Link href="/login" className="header__link">
                        Login
                    </Link>
                )}
                {loggedInUser && (
                    <a
                        href="#"
                        className="header__link"
                        onClick={handleLogout}
                    >
                        Logout
                    </a>
                )}
                {loggedInUser && (
                    <div className="header__user">
                        Welcome,{loggedInUser}
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;