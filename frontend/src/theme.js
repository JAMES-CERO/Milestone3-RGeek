export const colorTokens = {
    dark: {
        background: "#000000",
        header: "#FF0000",
        icon: "#F55968",
    },
    light: {
        background: "#FFFFFF",
        header: "#FF0000",
        icon: "#F55968",
    },
};

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    primary: {
                        dark: colorTokens.dark.header,
                        main: colorTokens.dark.header,
                        light: colorTokens.dark.header,
                    },
                    text: {
                        primary: "#FFFFFF", 
                    },
                    background: {
                        default: colorTokens.dark.background,
                        alt: colorTokens.dark.background,
                    },
                }
                : {
                    primary: {
                        dark: colorTokens.light.header,
                        main: colorTokens.light.header,
                        light: colorTokens.light.header,
                    },
                    text: {
                        primary: "#FFFFFF", 
                    },
                    background: {
                        default: colorTokens.light.background,
                        alt: colorTokens.light.background,
                    },
                }),
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};