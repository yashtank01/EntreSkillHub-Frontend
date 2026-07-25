

document.addEventListener("DOMContentLoaded", () => {
    const ideasContainer = document.getElementById('saved-ideas-container');
    const mentorsContainer = document.getElementById('mentor-requests-container');

    if (ideasContainer && mentorsContainer) {
        async function loadProgressFromDB() {
            // Get current user's email to filter the database
            const userEmail = localStorage.getItem("userEmail") || "testuser@demo.com"; 
            
            // --- FETCH IDEAS FROM DB ---
            try {
                ideasContainer.innerHTML = '<p>Loading ideas from database...</p>';
                const ideasRes = await fetch(`https://entireskillhub-backend.onrender.com/api/saved-ideas?email=${encodeURIComponent(userEmail)}`);
                const ideas = await ideasRes.json();
                
                ideasContainer.innerHTML = ''; 
                if (ideas.length === 0) {
                    ideasContainer.innerHTML = '<p style="color: #64748b;">No ideas bookmarked yet.</p>';
                } else {
                    ideas.forEach(idea => {
                        ideasContainer.innerHTML += `
                            <div class="item-card">
                                <h4>${idea.ideaName || idea.idea}</h4>
                                <p>Saved on: ${new Date(idea.savedAt || Date.now()).toLocaleDateString()}</p>
                                <a href="roadmap.html?idea=${encodeURIComponent(idea.ideaName || idea.idea)}" class="btn" style="display:inline-block; text-decoration:none; margin-top:10px; width:auto; font-size: 0.85em;">View Roadmap ➔</a>
                            </div>
                        `;
                    });
                }
            } catch (e) {
                ideasContainer.innerHTML = '<p style="color: #ef4444;">Failed to fetch from Database.</p>';
            }

            // --- FETCH MENTORS FROM DB ---
            try {
                mentorsContainer.innerHTML = '<p>Loading requests from database...</p>';
                const mentorsRes = await fetch(`https://entireskillhub-backend.onrender.com/api/mentor-requests?email=${encodeURIComponent(userEmail)}`);
                const mentors = await mentorsRes.json();
                
                mentorsContainer.innerHTML = ''; 
                if (mentors.length === 0) {
                    mentorsContainer.innerHTML = '<p style="color: #64748b;">No mentors requested yet.</p>';
                } else {
                    mentors.forEach(req => {
                        mentorsContainer.innerHTML += `
                            <div class="item-card" style="border-left-color: #f59e0b;">
                                <h4>${req.mentorName || 'Mentor'}</h4>
                                <p>Status: <strong style="color: #f59e0b;">${req.status || 'Pending'}</strong></p>
                            </div>
                        `;
                    });
                }
            } catch (e) {
                mentorsContainer.innerHTML = '<p style="color: #ef4444;">Failed to fetch from Database.</p>';
            }
        }
        
        loadProgressFromDB();
    }
});