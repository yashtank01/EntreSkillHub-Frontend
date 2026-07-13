// ==========================================
// 1. global.js (Loaded on EVERY page)
// ==========================================

// Apply theme immediately to prevent white flashing
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- THEME TOGGLE LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- MOBILE NAVBAR NAVIGATION LOGIC (Placeholder for your UI) ---
    // const mobileToggle = document.getElementById('mobile-toggle');
    // if(mobileToggle) { /* Add menu slide logic here */ }
});

// --- GLOBAL NOTIFICATION SYSTEM ---
function showNotification(message, isSuccess) {
    const toast = document.getElementById('toast-message');
    if (!toast) return; 
    
    toast.innerText = message;
    toast.className = isSuccess ? 'toast success' : 'toast error';
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}