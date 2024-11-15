import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Button } from "../ui/button";

function LandingNav() {
    const { userLoggedIn } = useContext(AuthContext);
    return (
        <div className="flex justify-between text-white max-w-6xl mx-auto py-8">
            <Link to="/" className="text-4xl font-medium">
                my<span className="text-pastel-orange font-semibold">Sips</span>
            </Link>
            <div className=" gap-x-12 w-full flex-grow flex items-center w-auto text-center">
                <ul className="flex-1 justify-end items-center text-center flex">
                    <li className="mr-12">
                        <Link to="/app">Features</Link>
                    </li>
                    <li className="mr-12">
                        <Link to="/app">Pricing</Link>
                    </li>
                    <li className="mr-12">
                        <Link to="/app">About Us</Link>
                    </li>

                    {userLoggedIn ? (
                        <li>
                            <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-sm px-4 text-white">
                                <Link to="/app">mySips App</Link>
                            </Button>
                        </li>
                    ) : (
                        <li>
                            <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-sm px-4 text-white">
                                <Link to="/login">Log In</Link>
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default LandingNav;
