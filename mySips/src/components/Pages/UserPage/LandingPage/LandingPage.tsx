import LandingNav from "@/components/Landing/LandingNav";
import { Button } from "@/components/ui/button";
import {
    ArrowDown,
    ChevronDown,
    ChevronsDown,
    CircleArrowDown,
    CircleChevronDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

function LandingPage() {
    return (
        <section className="bg-background-dark bg-cover">
            <LandingNav />
            <section className="flex flex-col mt-24 min-h-screen w-full px-16">
                <div className="mx-auto text-center max-w-4xl space-y-8 w-full">
                    <h1 className="text-6xl font-semibold text-white-blue ">
                        Where every sip tells a story, your{" "}
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            personal drink journal
                        </span>
                    </h1>
                    <p className="text-white-blue text-xl opacity-80">
                        mySips is your way to store all your favorite drinks in
                        one place! Making going out effortless.
                    </p>
                    <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-8 text-white">
                        Get started, it's free
                    </Button>
                    <p className="text-white-blue text-sm opacity-60">
                        No in-app purchases
                    </p>
                    <div className="flex justify-center">
                        <div className="w-full bg-white bg-opacity-80 h-[600px] w-full mt-8 rounded-md"></div>
                    </div>
                </div>
            </section>
            <div className="mt-24 mb-24">
                <Separator className="absolute relative bg-white opacity-15 max-w-4xl mx-auto" />
                <CircleChevronDown className="absolute relative -top-4 w-8 h-8 mx-auto stroke-pastel-pink bg-background-dark" />
            </div>
            <section className="flex flex-col h-full w-full px-16">
                <div className="mx-auto  max-w-4xl space-y-8 w-full">
                    <h1 className="text-center text-6xl font-semibold text-white-blue">
                        How to use mySips<br></br>
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            for consumers.
                        </span>
                    </h1>

                    <p className="text-center text-white-blue text-xl opacity-80 ">
                        mySips offers an easy and intuitive way to manage your
                        drinks. There are generally four steps involved in how
                        you can use this platform.
                    </p>
                    <div>
                        <div className="lg:flex justify-center">
                            <div className="w-full lg:w-1/2  h-[500px] mt-8 rounded-md lg:mr-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex">
                                <h2 className="w-full text-6xl font-semibold text-white-blue p-4">
                                    Add Drinks
                                </h2>
                                <div className="bg-white bg-opacity-25 w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold rotate-12">
                                        1
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:ml-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex">
                                <h2 className="w-full text-6xl font-semibold text-white-blue p-4">
                                    Track Stats
                                </h2>
                                <div className="bg-white bg-opacity-25 w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold -rotate-6">
                                        2
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex justify-center">
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:mr-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex ">
                                <h2 className="w-full text-6xl font-semibold text-white-blue p-4">
                                    Make Boards
                                </h2>
                                <div className="bg-white bg-opacity-25 w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold rotate-12">
                                        3
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:ml-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex overflow-hidden">
                                <h2 className="w-full text-6xl font-semibold text-white-blue p-4">
                                    Share to Friends
                                </h2>
                                <div className="bg-white bg-opacity-25 w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold -rotate-12">
                                        4
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mt-24 mb-24">
                <Separator className="absolute relative bg-white opacity-15 max-w-4xl mx-auto" />
                <CircleChevronDown className="absolute relative -top-4 w-8 h-8 mx-auto stroke-pastel-pink bg-background-dark" />
            </div>
            <section className="flex flex-col h-full w-full px-16">
                <div className="mx-auto  max-w-4xl space-y-8 w-full">
                    <h1 className="text-center text-6xl font-semibold text-white-blue leading-none">
                        Utilizing drink data<br></br>
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            for producers.
                        </span>
                    </h1>
                </div>
            </section>
            <footer className="min-h-[200px] bg-background-block"></footer>
        </section>
    );
}

export default LandingPage;
