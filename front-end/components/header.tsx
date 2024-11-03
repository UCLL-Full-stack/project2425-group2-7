import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__logo">Dealership</div>
            <nav className="header__nav">
                <Link href="/" className="header__link">Home</Link>
                <Link href="/car_acquisition" className="header__link">Cars</Link>
            </nav>
        </header>
    );
}

export default Header;