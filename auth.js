// ==========================================
// 2. auth.js (Authentication & Form Toggles)
// ==========================================

function toggleForms() {
    const loginSec = document.getElementById('login-section');
    const regSec = document.getElementById('register-section');
    if (loginSec && regSec) {
        loginSec.classList.toggle('hidden');
        regSec.classList.toggle('hidden');
    }
}

function togglePassword(inputId, iconElement) {
    const passwordInput = document.getElementById(inputId);
    const openEyeSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const closedEyeSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c3.5 4 7.5 7 10 7s6.5-3 10-7"/><path d="M12 19v2"/><path d="M17 17.5l1.5 1.5"/><path d="M7 17.5l-1.5 1.5"/></svg>`;

    if (passwordInput && passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconElement.innerHTML = openEyeSVG;
    } else if (passwordInput) {
        passwordInput.type = 'password';
        iconElement.innerHTML = closedEyeSVG;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- REGISTER FORM LOGIC ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // 🛑 Stops the refresh
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            
            // Safe check for role in case the dropdown isn't in your HTML yet
            const roleElement = document.getElementById('reg-role');
            const role = roleElement ? roleElement.value : 'student';

            try {
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role }) // Added role here!
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showNotification('🎉 ' + data.message + ' You can now log in!', true);
                    registerForm.reset();
                    setTimeout(toggleForms, 1500); 
                } else {
                    
                    showNotification('❌ Registration failed: ' + data.error, false);
                }
            } catch (error) {
                showNotification('❌ Could not connect to the server.', false);
            }
        });
    }

    // --- LOGIN FORM LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // 🛑 Stops the refresh
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showNotification('✅ ' + data.message, true);
                    localStorage.setItem('userRole', data.role);
                    
                    // Smart redirect based on role
                    setTimeout(() => {
                        if (data.role === 'mentor') {
                            window.location.href = `mentor-dashboard.html?name=${encodeURIComponent(data.name)}`;
                        } else if (data.role === 'admin') {
                            window.location.href = `admin-dashboard.html?name=${encodeURIComponent(data.name)}`;
                        } else {
                            // Default student route
                            window.location.href = `dashboard.html?name=${encodeURIComponent(data.name)}`;
                        }
                    }, 1500);
                } else {
                    alert("Backend says: " + data.error);
                    showNotification(`❌ ${data.error}`, false);
                }
            } catch (error) {
                showNotification('❌ Could not connect to the server.', false);
            }
        });
    }
});