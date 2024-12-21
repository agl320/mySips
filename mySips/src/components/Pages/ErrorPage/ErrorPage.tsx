import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <section className="h-screen w-full flex flex-col justify-center">
            <h1 className="text-white font-thin text-5xl font-wide text-center mb-8">
                mySips
            </h1>
            <div className="flex text-center justify-center">
                <h1 className="text-white font-semibold mr-8 text-xl">404</h1>
                <Separator orientation="vertical" className="bg-white mr-8" />
                <p className="text-white font-medium">
                    This <span className="line-through">page</span>{" "}
                    <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text fontmedium">
                        drink
                    </span>{" "}
                    could not be <span className="line-through">found</span>{" "}
                    <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text medium">
                        drank
                    </span>
                    .
                </p>
            </div>
            <div className="text-center mt-8">
                <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-white">
                    <Link to="/"> Go home</Link>
                </Button>
            </div>
        </section>
    );
}

export default ErrorPage;
