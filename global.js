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
document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById('upload-content-form');

    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // 🛑 THIS STOPS THE REFRESH!

            // Grab the values from the form
            const title = document.getElementById('content-title').value;
            const type = document.getElementById('content-type').value;
            const category = document.getElementById('content-category').value;
            const bodyOrLink = document.getElementById('content-body').value;
            const authorName = "Platform Mentor/Admin"; 

            try {
                // Send the data to your backend
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/upload-content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, type, category, bodyOrLink, authorName })
                });

                const data = await response.json();

                if (response.ok) {
                    if (typeof showNotification === 'function') {
                        showNotification('✅ ' + data.message, true);
                    } else {
                        alert('✅ ' + data.message);
                    }
                    uploadForm.reset(); // Clears the form after success
                } else {
                    alert('❌ Error: ' + (data.error || "Could not upload content."));
                }
            } catch (error) {
                console.error("Upload Error:", error);
                alert('❌ Could not connect to the server.');
            }
        });
    }
});
// --- LOAD CONTENT FOR STUDENTS ---
async function loadStudentContent() {
    const feed = document.getElementById('student-content-feed');
    if (!feed) return; // Only run if we are actually on the student dashboard

    try {
        const response = await fetch('https://entireskillhub-backend.onrender.com/api/content');
        const contents = await response.json();

        feed.innerHTML = ''; // Clear the "Loading..." text

        if (contents.length === 0) {
            feed.innerHTML = '<p>No training content available yet. Check back later!</p>';
            return;
        }

        // Loop through every piece of content in the database and create a card
        contents.forEach(item => {
            const card = document.createElement('div');
            card.className = 'content-card';
            
            // If it's a video, make a link. If it's an article, show a preview.
            let mediaHtml = '';
            if (item.type === 'video') {
                mediaHtml = `<a href="${item.bodyOrLink}" target="_blank" class="watch-btn">▶ Watch Video</a>`;
            } else {
                mediaHtml = `<p class="article-preview">${item.bodyOrLink.substring(0, 80)}...</p>
                             <a href="#" class="read-btn">Read Full Article</a>`;
            }

            card.innerHTML = `
                <div class="card-badge">${item.category}</div>
                <h4>${item.title}</h4>
                <p class="author-text">By ${item.authorName}</p>
                ${mediaHtml}
            `;
            feed.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load content:", error);
        feed.innerHTML = '<p>❌ Error loading content. Please try again later.</p>';
    }
}

// Make sure it runs as soon as the student dashboard opens!
document.addEventListener("DOMContentLoaded", () => {
    loadStudentContent();
});
// Loop through every piece of content in the database and create a card
        contents.forEach(item => {
            const card = document.createElement('div');
            card.className = 'content-card';
            
            // --- NEW: Bulletproof Link Checker ---
            let safeLink = item.bodyOrLink;
            if (item.type === 'video' && !safeLink.startsWith('http')) {
                safeLink = 'https://' + safeLink; // Automatically adds https:// if they forgot it!
            }
            // ------------------------------------

            // If it's a video, make a link. If it's an article, show a preview.
            let mediaHtml = '';
            if (item.type === 'video') {
                mediaHtml = `<a href="${safeLink}" target="_blank" class="watch-btn">▶ Watch Video</a>`;
            } else {
                mediaHtml = `<p class="article-preview">${item.bodyOrLink.substring(0, 80)}...</p>
                             <a href="#" class="read-btn">Read Full Article</a>`;
            }

            card.innerHTML = `
                <div class="card-badge">${item.category}</div>
                <h4>${item.title}</h4>
                <p class="author-text">By ${item.authorName}</p>
                ${mediaHtml}
            `;
            feed.appendChild(card);
        });