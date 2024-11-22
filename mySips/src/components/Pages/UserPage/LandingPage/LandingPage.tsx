import LandingNav from "@/components/Landing/LandingNav";
import { Button } from "@/components/ui/button";

function LandingPage() {
    return (
        <section className="bg-test-bg bg-cover">
            <LandingNav />
            <section className="flex flex-col mt-20 h-screen w-full">
                <div className="mx-auto text-center max-w-4xl space-y-8">
                    <h1 className="text-6xl font-semibold text-white-blue ">
                        Where Every Sip Tells a Story, Your Personal Drink
                        Journal.
                    </h1>
                    <p className="text-white-blue text-xl opacity-80 ">
                        mySips is your way to store all your favorite drinks in
                        one place! Making going out effortless.
                    </p>
                    <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-sm px-8 text-white">
                        Get started, it's free
                    </Button>
                    <p className="text-white-blue text-sm opacity-60">
                        No in-app purchases
                    </p>
                    <div className="flex justify-center">
                        <div className="w-full bg-white bg-opacity-80 h-[500px] w-full mt-8"></div>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default LandingPage;
