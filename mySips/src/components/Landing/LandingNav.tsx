import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function LandingNav() {
    const { userLoggedIn } = useContext(AuthContext);
    return (
        <header>
            <div className="flex justify-center w-full px-16 bg-white/5">
                <div className="flex justify-between text-white max-w-6xl w-full py-8 ">
                    <Link
                        to="/"
                        className="text-5xl font-regular font-wide whitespace-nowrap"
                    >
                        ./my
                        <span className="text-pastel-orange font-regular bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            Sips
                        </span>
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
                                    <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white">
                                        <Link to="/app">mySips App</Link>
                                    </Button>
                                </li>
                            ) : (
                                <li>
                                    <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white">
                                        <Link to="/login">Log In</Link>
                                    </Button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Separator className="w-full bg-custom h-[1px]" />
        </header>
    );
}

export default LandingNav;
