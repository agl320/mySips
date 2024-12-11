import { CircleCheck } from "lucide-react";

function LoginPageContentLeftCard() {
    return (
        <div className="lg:w-1/3 m-8 lg:mr-4 bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-md">
            <section className="space-y-8 p-16">
                <h1 className="text-white text-5xl font-semibold">
                    Unlock a new way of drink management
                </h1>
                <p className="text-white text-base">
                    A clean, convenient, and most of all, fun way to store your
                    drinks.
                </p>
                <ul className="space-y-2">
                    <li className="flex gap-x-4 text-white">
                        <CircleCheck
                            fill="white"
                            className="stroke-pastel-pink w-8 h-8"
                            strokeWidth={3}
                        />
                        <p className="font-medium flex flex-col flex-1 justify-center">
                            Add friends and view their drinks
                        </p>
                    </li>
                    <li className="flex gap-x-4 text-white">
                        <CircleCheck
                            fill="white"
                            className="stroke-pastel-pink w-8 h-8"
                            strokeWidth={3}
                        />
                        <p className="font-medium flex flex-col flex-1 justify-center">
                            Groupify your drinks to make managing easy
                        </p>
                    </li>
                    <li className="flex gap-x-4 text-white">
                        <CircleCheck
                            fill="white"
                            className="stroke-pastel-pink w-8 h-8"
                            strokeWidth={3}
                        />
                        <p className="font-medium flex flex-col flex-1 justify-center">
                            Track drink statistics and let us predict what you
                            like
                        </p>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default LoginPageContentLeftCard;
