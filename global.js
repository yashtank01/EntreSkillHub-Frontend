let currentTheme = localStorage.getItem('theme');

// Agar user pehli baar aaya hai (memory khali hai), toh usko "dark" set kar do!
if (!currentTheme) {
    currentTheme = 'dark';
    localStorage.setItem('theme', 'dark');
}

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}


// INITIALIZATION ON PAGE LOAD

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

    // --- UPLOAD CONTENT LOGIC (For Mentor/Admin Dashboard) ---
    const uploadForm = document.getElementById('upload-content-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            const title = document.getElementById('content-title').value;
            const type = document.getElementById('content-type').value;
            const category = document.getElementById('content-category').value;
            
            // FIX: Updated variable names to match our new MongoDB Schema
            const url = document.getElementById('content-body').value;
            const uploadedBy = localStorage.getItem('userName') || "Platform Mentor/Admin"; 

            try {
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/upload-content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, type, category, url, uploadedBy }) // Fixed names here
                });

                const data = await response.json();

                if (response.ok) {
                    if (typeof showNotification === 'function') {
                        showNotification('✅ ' + data.message, true);
                    } else {
                        alert('✅ ' + data.message);
                    }
                    uploadForm.reset(); 
                } else {
                    alert('❌ Error: ' + (data.error || "Could not upload content."));
                }
            } catch (error) {
                console.error("Upload Error:", error);
                alert('❌ Could not connect to the server.');
            }
        });
    }

    // --- SKILL PROFILING LOGIC (For profiling.html) ---
    const profilingForm = document.getElementById('profiling-form');
    if (profilingForm) {
        profilingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Gather ALL selected skills into an array
            const selectedSkills = [];
            const checkboxes = document.querySelectorAll('input[name="skills"]:checked');
            
            checkboxes.forEach((box) => {
                selectedSkills.push(box.value);
            });

            // 2. Stop them if they didn't pick anything
            if (selectedSkills.length === 0) {
                alert("Please select at least one skill to continue!");
                return;
            }

            // 3. Save the array of skills to local memory
            localStorage.setItem("userSkills", JSON.stringify(selectedSkills));

            // 4. Send them to the dashboard with Name and Email from memory
            const userName = localStorage.getItem('userName') || "";
            const userEmail = localStorage.getItem('userEmail') || "";
            window.location.href = `dashboard.html?name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}`;
        });
    }

    // --- TRIGGER STUDENT DASHBOARD LOAD ---
    loadStudentContent();
});



// GLOBAL FUNCTIONS

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


// --- LOAD & FILTER CONTENT FOR STUDENTS ---
async function loadStudentContent() {
    const feed = document.getElementById('student-content-feed');
    if (!feed) return; 

    try {
        const response = await fetch('https://entireskillhub-backend.onrender.com/api/content');
        const allContents = await response.json();

        const savedSkills = JSON.parse(localStorage.getItem("userSkills") || "[]");

        let contentsToDisplay = allContents;
        
        if (savedSkills.length > 0) {
            contentsToDisplay = allContents.filter(item => savedSkills.includes(item.category));
        }

        feed.innerHTML = ''; 

        if (contentsToDisplay.length === 0) {
            feed.innerHTML = '<p style="color: #64748b;">No training content available for your selected skills yet. Check back later!</p>';
            return;
        }

        contentsToDisplay.forEach(item => {
            const card = document.createElement('div');
            card.className = 'content-card';
            
            
            let safeLink = item.url;
            if (item.type === 'video' && !safeLink.startsWith('http')) {
                safeLink = 'https://' + safeLink; 
            }

            let mediaHtml = '';
            if (item.type === 'video') {
                mediaHtml = `<a href="${safeLink}" target="_blank" class="watch-btn" style="text-decoration:none; display:inline-block; margin-top:10px;">▶ Watch Video</a>`;
            } else {
                mediaHtml = `<p class="article-preview" style="color: #64748b; font-size: 0.9em; margin-bottom:10px;">${item.url.substring(0, 60)}...</p>
                             <a href="${safeLink}" target="_blank" class="read-btn" style="text-decoration:none; color: #3b82f6; font-weight: bold;">Read Full Article ➔</a>`;
            }

            card.innerHTML = `
                <div class="card-badge" style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; display: inline-block; margin-bottom: 10px;">${item.category}</div>
                <h4 style="margin-bottom: 5px;">${item.title}</h4>
                <p class="author-text" style="color: #94a3b8; font-size: 0.85em; margin-bottom: 15px;">By ${item.uploadedBy || "Admin"}</p>
                ${mediaHtml}
            `;
            feed.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load content:", error);
        feed.innerHTML = '<p>❌ Error loading content. Please try again later.</p>';
    }
}