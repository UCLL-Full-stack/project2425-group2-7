import Link from "next/link";
import { useEffect, useState } from "react";
interface UserData {
    token: string;
    fullName: string;
    username: string;
    role: string;
  }

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string>("");
    const [userData, setUserData] = useState<UserData | null>(null);

    // useEffect(() => {
    //     const user = sessionStorage.getItem("loggedInUser");
    //     if (user) {
    //         setLoggedInUser(user);
    //     }
    // }, []);

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
                {userData?.role === 'CUSTOMER' &&
                 <Link href="/trade-in" className="header__link">
                    Trade your car
                </Link>}
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
                        Welcome
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;