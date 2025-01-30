import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function LandingNav() {
    const { userLoggedIn } = useContext(AuthContext);
    return (
        <header>
            <div className="flex justify-center w-full px-16 bg-white bg-opacity-[2%]">
                <div className="flex justify-between text-white max-w-6xl w-full py-6">
                    <Link
                        to="#mysips"
                        className="text-4xl font-regular font-wide whitespace-nowrap flex items-baseline"
                    >
                        my
                        <span className="text-pastel-orange font-regular bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            Sips
                        </span>
                        <img
                            src="./images/mysips-logo.png"
                            className="h-8 w-8 ml-2"
                            style={{ verticalAlign: "baseline" }}
                        />
                    </Link>
                    <div className="gap-x-12 w-full flex-grow flex items-center w-auto text-center text-md">
                        <ul className="flex-1 justify-end items-center text-center flex">
                            <li className="">
                                <a
                                    className="px-3 mx-3 py-2 hover:bg-white/10 rounded-md duration-100 cursor-pointer"
                                    href="#consumers"
                                >
                                    Consumers
                                </a>
                            </li>
                            <li className="mr-6">
                                <a
                                    className="px-3 mx-3 py-2 hover:bg-white/10 rounded-md duration-100"
                                    href="#producers"
                                >
                                    Producers
                                </a>
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
