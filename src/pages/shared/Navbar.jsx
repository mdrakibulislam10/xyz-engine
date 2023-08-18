import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <Link to={"/"}>
                <h1 className="text-3xl md:text-5xl font-bold"><span className="text-sky-600">XYZ</span> ENGINE</h1>
            </Link>
        </header>
    );
};

export default Navbar;