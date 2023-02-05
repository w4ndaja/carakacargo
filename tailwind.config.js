const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.js",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Lato", "Mulish", ...defaultTheme.fontFamily.sans],
            },
            transitionProperty: {
                ...defaultTheme.transitionProperty,
                height: "max-height",
                width: "max-width",
            },
        },
        plugins: [require("@tailwindcss/forms")],
    },

    plugins: [require("@tailwindcss/forms")],
};
