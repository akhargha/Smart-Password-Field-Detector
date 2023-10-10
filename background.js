browser.runtime.onMessage.addListener(function (message) {
    if (message.hasPassword) {
        // You can perform any action here, such as showing a notification or changing the icon of your extension.
        console.log('This site has a password field.');
    }
});
