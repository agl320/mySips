/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["General Sans", "sans-serif"],
            },
            colors: {
                ["secondary-light"]: "#e1e1fe",
                ["pastel-orange"]: "#ff844b",
                ["pastel-pink"]: "#ff5466",
                ["white-blue"]: "#eef5ff",
            },
            backgroundImage: {
                "test-bg": "url('/backgrounds/temp_bg.png')",
            },
            // colors: {
            // 	sidebar: {
            // 		DEFAULT: 'hsl(var(--sidebar-background))',
            // 		foreground: 'hsl(var(--sidebar-foreground))',
            // 		primary: 'hsl(var(--sidebar-primary))',
            // 		'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
            // 		accent: 'hsl(var(--sidebar-accent))',
            // 		'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
            // 		border: 'hsl(var(--sidebar-border))',
            // 		ring: 'hsl(var(--sidebar-ring))'
            // 	}
            // }
        },
    },
    plugins: [require("tailwindcss-animate")],
};
