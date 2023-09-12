import { navigate } from 'gatsby';

export function handleLogout() {
    // Remove the authentication-related data from local storage
    localStorage.removeItem('auth');
    localStorage.removeItem('woo-session');
  
    // Redirect the user to the homepage or the login page
    navigate('/');
  }
  