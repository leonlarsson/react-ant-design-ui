/** Sets the antdThemeHeader localStorage based on the input. Then fires away a new event. */
export const handleHeaderThemeChange = theme => {
    localStorage.setItem("antdThemeHeader", theme.target.checked ? "dark" : "light");
    window.dispatchEvent(new Event("storage"));
};

/** Sets the antdThemeMenu localStorage based on the input. Then fires away a new event. */
export const handleMenuThemeChange = theme => {
    localStorage.setItem("antdThemeMenu", theme.target.checked ? "dark" : "light");
    window.dispatchEvent(new Event("storage"));
};

/** Sets the globalAntdTheme localStorage based on the input. Then fires away a new event. */
export const handleGlobalAntdThemeChange = theme => {
    localStorage.setItem("globalAntdTheme", theme.target.checked ? "dark" : "light");
    window.dispatchEvent(new Event("storage"));
};