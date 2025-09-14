// Authentication check and redirect script
// Add this to any page that requires authentication

// Function to check if user is logged in
function checkAuthentication() {
    console.log("Checking authentication...");
    
    // Check if authentication data exists in localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    const userRole = localStorage.getItem('userRole');
    
    console.log("Auth data:", { isLoggedIn, loginTime, userRole });
    
    // If not logged in, redirect to login page
    if (!isLoggedIn || !loginTime || !userRole) {
        console.log("Not authenticated, redirecting to login...");
        redirectToLogin();
        return false;
    }
    
    // Check if session is expired (24 hours)
    const currentTime = new Date().getTime();
    const sessionDuration = 120 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    if (currentTime - parseInt(loginTime) > sessionDuration) {
        // Session expired, clear storage and redirect
        console.log("Session expired, redirecting to login...");
        clearAuthentication();
        redirectToLogin();
        return false;
    }
    
    // Update login time to extend session (only if page is not redirecting)
    localStorage.setItem('loginTime', currentTime.toString());
    
    console.log("User is authenticated");
    return true;
}

// Function to set authentication data after successful login
function setAuthentication(role, userData = {}) {
    const loginTime = new Date().getTime();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTime', loginTime.toString());
    localStorage.setItem('userRole', role);
    
    // Store additional user data if provided
    if (userData && typeof userData === 'object') {
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    console.log("Authentication set for:", role);
}

// Function to clear authentication data
function clearAuthentication() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    console.log("Authentication cleared");
}

// Function to redirect to login page
function redirectToLogin() {
    console.log("Redirecting to login page...");
    // Use replace instead of href to prevent back button issues
    window.location.replace('https://trendseducation.github.io/ujjwalacademy/login.html');
}

// Function to get user data
function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

// Function to get user role
function getUserRole() {
    return localStorage.getItem('userRole');
}

// Function to logout user
function logout() {
    console.log("Logging out...");
    clearAuthentication();
    redirectToLogin();
}

// Check authentication on page load
console.log("Authentication script loaded");
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, checking authentication");
    
    // Don't check authentication on login page itself
    if (window.location.pathname.endsWith('login.html')) {
        console.log("On login page, skipping auth check");
        return;
    }
    
    checkAuthentication();
});

// Add global function to check if user is authenticated
window.isAuthenticated = function() {
    return checkAuthentication();
};