// --- MENTOR SECURITY BOUNCER ---
const currentRole = localStorage.getItem('userRole');

// Check if they are a mentor (we also let admins in, because admins should see everything!)
if (currentRole !== 'mentor' && currentRole !== 'admin') {
    alert("🔒 Access Denied: You must be an approved Mentor to view this page.");
    window.location.href = 'auth.html'; 
}