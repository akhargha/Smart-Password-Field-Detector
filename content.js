function valueIsLikePassword(value) {
    if (!value) {
        return false;
    }

    // Removes all whitespace, _ and - characters
    const cleanedValue = value.toLowerCase().replace(/[\s_\-]/g, "");

    if (cleanedValue.indexOf("password") < 0) {
        return false;
    }

    // Assuming you have defined AutoFillConstants.PasswordFieldIgnoreList elsewhere in your code
    if (AutoFillConstants && AutoFillConstants.PasswordFieldIgnoreList.some((i) => cleanedValue.indexOf(i) > -1)) {
        return false;
    }

    return true;
}

function isLikePassword(field) {
    if (field.type !== "text") {
        return false;
    }
    if (valueIsLikePassword(field.htmlID)) {
        return true;
    }
    if (valueIsLikePassword(field.htmlName)) {
        return true;
    }
    if (valueIsLikePassword(field.placeholder)) {
        return true;
    }
    return false;
}

function detectPasswordField() {
    const passwordFields = [...document.querySelectorAll('input[type="password"], input[type="text"]')];

    const hasPassword = passwordFields.some(field => {
        return field.type === "password" || isLikePassword(field);
    });

    if (hasPassword) {
        browser.runtime.sendMessage({ hasPassword: true });
    }
}

// Run the function initially in case the password field is already there.
detectPasswordField();

// Set up a mutation observer to detect DOM changes.
const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            detectPasswordField();
        }
    }
});

// Start observing the entire document with the configured parameters.
observer.observe(document, { childList: true, subtree: true });
