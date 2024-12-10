// src/utils/auth.js

export function isAdminAuthenticated() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }
  
  export function authenticateAdmin(adminData) {
    localStorage.setItem('admin', JSON.stringify(adminData));
  }
  
  export function logoutAdmin() {
    localStorage.removeItem('admin');
  }