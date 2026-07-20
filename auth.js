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

// // --- FORGOT PASSWORD LOGIC ---
// async function handleForgotPassword() {
//     const email = prompt("Enter your registered email address to receive a password reset link:");
//     if (!email) return;

//     try {
//         const response = await fetch('https://entireskillhub-backend.onrender.com/api/forgot-password', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email: email }) 
//         });
        
//         const data = await response.json();
        
//         if (response.ok) {
//             showNotification('✉️ ' + data.message, true);
//         } else {
//             showNotification('❌ ' + data.error, false);
//         }
//     } catch (error) {
//         showNotification('❌ Could not connect to the server.', false);
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
    
    // --- REGISTER FORM LOGIC ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 
            
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "⏳ Creating Account...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";

            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const roleElement = document.getElementById('reg-role');
            const role = roleElement ? roleElement.value : 'student';

            try {
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role }) 
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    localStorage.setItem("userEmail", email);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userRole", role);

                    if (typeof showNotification === 'function') {
                        showNotification('✅ Account created! Redirecting to setup...', true);
                    } else {
                        alert("✅ Account created! Let's set up your profile.");
                    }

                    setTimeout(() => {
                        window.location.href = `profiling.html?name=${encodeURIComponent(name)}`;
                    }, 1500); 

                } else {
                    showNotification('❌ Registration failed: ' + data.error, false);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                    submitBtn.style.cursor = "pointer";
                }
            } catch (error) {
                showNotification('❌ Could not connect to the server.', false);
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitBtn.style.cursor = "pointer";
            }
        });
    }

    // --- LOGIN FORM LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 
            
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "⏳ Logging in...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";

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
                    localStorage.setItem('userRole', data.role);
                    
                    if (data.role === 'mentor' && data.isMentorApproved !== true) {
                        showNotification('Login successful! Your Mentor application is pending for Admin approval. Redirecting...', true);
                        setTimeout(() => {
                            window.location.href = `dashboard.html?name=${encodeURIComponent(data.name)}`;
                        }, 3500);
                    } else {
                        showNotification('✅ ' + data.message, true);
                        submitBtn.innerText = "✅ Success!"; 
                        
                        setTimeout(() => {
                            if (data.role === 'mentor') {
                                window.location.href = `mentor-dashboard.html?name=${encodeURIComponent(data.name)}`;
                            } else if (data.role === 'admin') {
                                window.location.href = `admin-dashboard.html?name=${encodeURIComponent(data.name)}`;
                            } else {
                                window.location.href = `dashboard.html?name=${encodeURIComponent(data.name)}`;
                            }
                        }, 1500);
                    }
                } else {
                    showNotification(`❌ ${data.error}`, false);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                    submitBtn.style.cursor = "pointer";
                }
            } catch (error) {
                showNotification('❌ Could not connect to the server.', false);
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitBtn.style.cursor = "pointer";
            }
        });
    }
});