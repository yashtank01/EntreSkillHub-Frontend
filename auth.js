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
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
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

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    showNotification('✅ ' + data.message, true);
                    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
                } else {
                    showNotification('❌ Login failed: ' + data.error, false);
                }
            } catch (error) {
                showNotification('❌ Could not connect to the server.', false);
            }
        });
    }
});