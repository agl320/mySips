import LandingNav from "@/components/Landing/LandingNav";
import { Button } from "@/components/ui/button";
import {
    ArrowDown,
    ArrowUpRight,
    ChevronDown,
    ChevronsDown,
    CircleArrowDown,
    CircleCheck,
    CircleChevronDown,
    MousePointerClick,
    Sparkles,
    Wand,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LandingFooter from "@/components/Landing/LandingFooter";

function LandingPage() {
    return (
        <section className="bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015] bg-cover">
            <LandingNav />

            <section className="flex flex-col mt-24 min-h-screen w-full px-16">
                <div className="mx-auto text-center max-w-4xl space-y-8 w-full">
                    <h1 className="text-6xl font-semibold text-white-blue ">
                        Where every sip tells a story, your{" "}
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            personal drink journal.
                        </span>
                    </h1>
                    <p className="text-white-blue text-xl opacity-80">
                        Store all your favorite drinks in one place — making
                        going out effortless.
                    </p>
                    <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-8 text-white">
                        Get started, it's free{" "}
                        <MousePointerClick strokeWidth={2} />
                    </Button>
                    <p className="text-white-blue text-sm opacity-60">
                        No in-app purchases
                    </p>
                    <div className="flex justify-center">
                        <div className="bg-preview bg-contain bg-no-repeat bg-center mt-8 rounded-md w-full h-[500px]"></div>
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
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:mr-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex">
                                <div className="bg-card-add bg-cover bg-left-bottom rounded-bl-md">
                                    <div className="p-4">
                                        <h2 className="w-full text-6xl font-semibold text-white mb-8">
                                            Add Drinks
                                        </h2>
                                        <ul className="space-y-2 text-lg">
                                            <li className="flex gap-x-4 text-white">
                                                <CircleCheck
                                                    fill="white"
                                                    className="stroke-pastel-pink w-8 h-8"
                                                    strokeWidth={3}
                                                />
                                                <p className="font-medium flex flex-col flex-1 justify-center">
                                                    Highly customizable
                                                </p>
                                            </li>
                                            <li className="flex gap-x-4 text-white">
                                                <CircleCheck
                                                    fill="white"
                                                    className="stroke-pastel-pink w-8 h-8"
                                                    strokeWidth={3}
                                                />
                                                <p className="font-medium flex flex-col flex-1 justify-center">
                                                    Easy to create
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white bg-opacity-25 w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold rotate-12">
                                        1
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:ml-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex">
                                <div className="bg-card-stats bg-cover bg-left-bottom rounded-bl-md">
                                    <div className="p-4">
                                        <h2 className="w-full text-6xl font-semibold text-white mb-8">
                                            Track Stats
                                        </h2>
                                        <ul className="space-y-2 text-lg">
                                            <li className="flex gap-x-4 text-white">
                                                <CircleCheck
                                                    fill="white"
                                                    className="stroke-pastel-pink w-8 h-8"
                                                    strokeWidth={3}
                                                />
                                                <p className="font-medium flex flex-col flex-1 justify-center">
                                                    Rich, useful charts
                                                </p>
                                            </li>
                                            <li className="flex gap-x-4 text-white">
                                                <CircleCheck
                                                    fill="white"
                                                    className="stroke-pastel-pink w-8 h-8"
                                                    strokeWidth={3}
                                                />
                                                <p className="font-medium flex flex-col flex-1 justify-center">
                                                    Easy to understand
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-25 w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold -rotate-6">
                                        2
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex justify-center">
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:mr-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex ">
                                <div className="bg-card-groups bg-cover bg-left-bottom rounded-bl-md">
                                    <div className="p-4">
                                        <h2 className="w-full text-6xl font-semibold text-white mb-8">
                                            Make Groups
                                        </h2>
                                        <ul className="space-y-2 text-lg">
                                            <li className="flex gap-x-4 text-white">
                                                <CircleCheck
                                                    fill="white"
                                                    className="stroke-pastel-pink w-8 h-8"
                                                    strokeWidth={3}
                                                />
                                                <p className="font-medium flex flex-col flex-1 justify-center">
                                                    Collaborate and create
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-25 w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold rotate-12">
                                        3
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:ml-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex overflow-hidden">
                                <h2 className="w-full text-6xl font-semibold text-white p-4 rounded-bl-md">
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
            <section className="flex flex-col h-full w-full px-16 mb-32">
                <div className="mx-auto  max-w-4xl w-full">
                    <h1 className="text-center text-6xl font-semibold text-white-blue leading-none">
                        Utilizing drink data<br></br>
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            for producers.
                        </span>
                    </h1>
                    <p className="text-center text-white-blue text-xl opacity-80 mt-8">
                        mySips offers an easy and intuitive way to quantify
                        customer satisfaction. This allows you to maximize
                        production efficiency and sales, providing another facet
                        into your menu analysis.
                    </p>
                    <p className="text-center text-white-blue text-xl opacity-80 mt-8">
                        Want to upload your menu and view analytics beneficial
                        to your business?
                    </p>
                    <div className="w-full h-[500px] rounded-md bg-gradient-to-r from-pastel-pink to-pastel-orange flex mt-16"></div>
                </div>
            </section>
            <LandingFooter />
        </section>
    );
}

export default LandingPage;
