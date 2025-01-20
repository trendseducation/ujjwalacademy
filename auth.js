(function () {
    const PASSCODE_PAGE = 'passcode.html'; // Redirect page
    const SESSION_TIMEOUT = 2 * 60 * 1000; // 10 minutes in milliseconds

    // Function to check authentication
    function checkAuthentication() {
        const authenticated = localStorage.getItem('authenticated');
        const expiration = localStorage.getItem('expiration');
        const now = new Date().getTime();

        if (authenticated !== 'true' || !expiration || now > expiration) {
            // Clear authentication data
            localStorage.removeItem('authenticated');
            localStorage.removeItem('expiration');

            // Redirect to passcode page
            location.href = PASSCODE_PAGE;
        } else {
            // Extend session expiration by 10 minutes
            const newExpiration = now + SESSION_TIMEOUT;
            localStorage.setItem('expiration', newExpiration);
        }
    }

    // Execute authentication check on page load
    window.onload = checkAuthentication;

    // Extend session on user activity
    document.addEventListener('mousemove', () => checkAuthentication());
    document.addEventListener('keydown', () => checkAuthentication());
})();