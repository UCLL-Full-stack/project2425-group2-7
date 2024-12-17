import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__logo">Dealership</div>
            <nav className="header__nav">
                <Link href="/" className="header__link">Home</Link>
                <Link href="/car_acquisition" className="header__link">Cars</Link>
                <Link href="/trade-in">Trade your car</Link>
                <Link href="/login">Login</Link>
                <Link href="/trades">Trade-Ins</Link>
            </nav>
        </header>
    );
}

export default Header;