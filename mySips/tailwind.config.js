/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["General Sans", "sans-serif"],
                wide: ["Moliga DEMO", "sans-serif"],
            },
            colors: {
                "background-dark": "#121312",
                ["background-block"]: "#1c1c1c",
                "background-light": "#262626",
                ["secondary-light"]: "#e1e1fe",
                ["pastel-orange"]: "#ff844b",
                ["pastel-pink"]: "#ff5466",
                ["white-blue"]: "#eef5ff",
                ["pastel-blue"]: "#528bff",
                ["pastel-purple"]: "#d152ff",
                ["pastel-green"]: "#54ff54",
                ["pastel-yellow"]: "#f2ef3f",
                orange: "#e0ad14",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
