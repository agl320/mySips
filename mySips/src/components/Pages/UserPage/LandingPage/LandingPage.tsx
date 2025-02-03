import LandingNav from "@/components/Landing/LandingNav";
import { Button } from "@/components/ui/button";
import {
    BarChart,
    CircleCheck,
    CircleChevronDown,
    Mail,
    MousePointerClick,
    ScissorsLineDashed,
    SendHorizontal,
    Sparkles,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LandingFooter from "@/components/Landing/LandingFooter";
import { Input } from "@/components/ui/input";

function LandingPage() {
    return (
        <section className="bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015] bg-cover">
            <LandingNav />

            <section
                className="flex flex-col mt-24 min-h-[600px] sm:min-h-screen w-full px-16"
                id="mysips"
            >
                <div className="mx-auto text-center max-w-4xl w-full">
                    <p className="bg-pastel-pink/10 px-3 py-1 rounded-full text-pastel-pink border border-pastel-pink text-sm inline-flex items-center mb-8">
                        Store Drinks Easily{" "}
                        <Sparkles className="w-4 h-4 ml-2" />
                    </p>

                    <h1 className="text-5xl sm:text-6xl font-semibold text-white-blue font-display mb-8">
                        Where every sip tells a story, your{" "}
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-transparent bg-clip-text">
                            personal drink journal.
                        </span>
                    </h1>
                    <p className="text-white-blue text-md sm:text-lg opacity-80 mb-8">
                        Store all your favorite drinks in one place — making
                        going out effortless.
                    </p>
                    <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-8 text-white mb-8">
                        Get started, it's free{" "}
                        <MousePointerClick strokeWidth={2} />
                    </Button>
                    <p className="text-white-blue text-sm opacity-60">
                        No in-app purchases
                    </p>
                    <div className="flex justify-center hidden sm:block">
                        <div className="bg-preview bg-contain bg-no-repeat bg-center rounded-md w-full h-[600px] mt-[-100px]"></div>
                    </div>
                </div>
            </section>

            <div className="sm:mt-24 mb-24">
                <Separator className="absolute relative max-w-4xl bg-custom h-[1px] mx-auto" />
                <CircleChevronDown className="absolute relative -top-4 w-8 h-8 mx-auto stroke-pastel-pink bg-background-dark" />
            </div>

            <section
                className="flex flex-col h-full w-full px-16"
                id="consumers"
            >
                <div className="mx-auto max-w-4xl space-y-8 w-full">
                    <div className="flex justify-center">
                        <p className="bg-pastel-pink/10 px-3 py-1 rounded-full text-pastel-pink border border-pastel-pink text-sm inline-flex items-center">
                            How to use mySips{" "}
                            <ScissorsLineDashed className="w-4 h-4 ml-2" />
                        </p>
                    </div>

                    <h2 className="text-center text-5xl sm:text-6xl font-semibold text-white-blue font-display">
                        How to use mySips
                        <br />
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-transparent bg-clip-text">
                            for consumers.
                        </span>
                    </h2>

                    <p className="text-center text-white-blue text-md sm:text-lg opacity-80 max-w-xl mx-auto">
                        mySips offers an easy and intuitive way to manage your
                        drinks. There are generally four steps involved in how
                        you can use this platform.
                    </p>
                    <div>
                        <div className="lg:flex justify-center">
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:mr-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex">
                                <div className="bg-card-add bg-cover bg-left-bottom rounded-bl-md w-full">
                                    <div className="p-6">
                                        <h3 className="w-full text-5xl font-semibold text-white mb-4 font-display">
                                            Add Drinks
                                        </h3>
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
                                <div className="bg-white bg-opacity-25 ml-auto w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold rotate-12">
                                        1
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:ml-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex">
                                <div className="bg-card-stats bg-cover bg-left-bottom rounded-bl-md w-full">
                                    <div className="p-6">
                                        <h3 className="w-full text-5xl font-semibold text-white mb-4 font-display">
                                            Track Stats
                                        </h3>
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
                                <div className="bg-white bg-opacity-25 ml-auto w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold -rotate-6">
                                        2
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex justify-center">
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:mr-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex">
                                <div className="bg-card-groups bg-cover bg-left-bottom rounded-bl-md w-full">
                                    <div className="p-6">
                                        <h3 className="w-full text-5xl font-semibold text-white mb-4 font-display">
                                            Make Groups
                                        </h3>
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
                                <div className="bg-white bg-opacity-25 ml-auto w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                    <p className="text-white/50 text-[300px] font-bold rotate-12">
                                        3
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 h-[500px] mt-8 rounded-md lg:ml-4 bg-gradient-to-r from-pastel-pink to-pastel-orange flex overflow-hidden">
                                <div className="bg-card-share bg-cover bg-left-bottom rounded-bl-md w-full">
                                    <div className="p-6">
                                        <h3 className="w-full text-5xl font-semibold text-white rounded-bl-md mb-4 w-full font-display">
                                            Share to Friends
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-25 ml-auto w-[150px] h-full rounded-md flex items-center justify-center overflow-hidden">
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
                <Separator className="absolute relative max-w-4xl bg-custom h-[1px] mx-auto" />
                <CircleChevronDown className="absolute relative -top-4 w-8 h-8 mx-auto stroke-pastel-pink bg-background-dark" />
            </div>

            <section
                className="flex flex-col h-full w-full px-16 mb-32"
                id="producers"
            >
                <div className="mx-auto max-w-4xl w-full">
                    <div className="flex justify-center">
                        <p className="bg-pastel-pink/10 px-3 py-1 rounded-full text-pastel-pink border border-pastel-pink text-sm inline-flex items-center mb-8">
                            Utilizing mySips data{" "}
                            <BarChart className="w-4 h-4 ml-2" />
                        </p>
                    </div>

                    <h2 className="text-center text-5xl sm:text-6xl font-semibold text-white-blue leading-none font-display">
                        Utilizing drink data
                        <br />
                        <span className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-transparent bg-clip-text">
                            for producers.
                        </span>
                    </h2>
                    <p className="text-center text-white-blue text-md sm:text-lg opacity-80 mt-8 max-w-xl mx-auto">
                        mySips offers an easy and intuitive way to quantify
                        customer satisfaction; maximize production efficiency
                        and sales.
                    </p>

                    <div className="w-full h-[500px] rounded-md bg-gradient-to-r from-pastel-pink to-pastel-orange mt-16">
                        <div className="flex flex-col justify-center h-full bg-contact-bg bg-cover bg-center">
                            <Mail className="w-16 h-16 mx-auto stroke-white/75 mb-8 p-2 bg-white/25 rounded-md border border-white/25" />
                            <h3 className="text-center text-white-blue text-5xl font-semibold text-white font-display max-w-lg mx-auto">
                                Sign up for updates
                            </h3>
                            <p className="text-center text-white text-lg mt-8 mb-8 max-w-lg mx-auto font-medium">
                                We’re not accepting new stores right now, but
                                check back for updates on future opportunities!
                            </p>
                            <div className="max-w-lg mx-auto flex mb-4 bg-white rounded-md">
                                <Input
                                    placeholder="company@domain.com"
                                    className="rounded-r-none border-r-1 border-r-black/25"
                                    disabled
                                />
                                <Button className="ml-2 bg-white rounded-l-none text-pastel-orange font-semibold cursor-not-allowed">
                                    Join <SendHorizontal strokeWidth={3} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LandingFooter />
        </section>
    );
}

export default LandingPage;
