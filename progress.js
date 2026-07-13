// ==========================================
// 6. progress.js (Progress State & Tracking)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const ideasContainer = document.getElementById('ideas-list');
    const mentorsContainer = document.getElementById('mentors-list');

    if (ideasContainer && mentorsContainer) {
        async function loadProgress() {
            try {
                // Fetch Ideas
                const ideasResponse = await fetch('http://localhost:5000/api/saved-ideas');
                const ideas = await ideasResponse.json();
                ideasContainer.innerHTML = ''; 

                if (ideas.length === 0) {
                    ideasContainer.innerHTML = '<p>No ideas bookmarked yet.</p>';
                } else {
                    ideas.forEach(idea => {
                        ideasContainer.innerHTML += `
                            <div class="item-card">
                                <h4>${idea.ideaName}</h4>
                                <p>Saved on: ${new Date(idea.savedAt).toLocaleDateString()}</p>
                                <a href="roadmap.html?idea=${encodeURIComponent(idea.ideaName)}" style="display:inline-block; background:#2563eb; color:white; padding:6px 12px; border-radius:4px; text-decoration:none; margin-top:10px; font-size:0.85em; font-weight:bold;">View Roadmap ➔</a>
                            </div>
                        `;
                    });
                }

                // Fetch Mentors
                const mentorsResponse = await fetch('http://localhost:5000/api/mentor-requests');
                const mentors = await mentorsResponse.json();
                mentorsContainer.innerHTML = ''; 

                if (mentors.length === 0) {
                    mentorsContainer.innerHTML = '<p>No mentors requested yet.</p>';
                } else {
                    mentors.forEach(req => {
                        mentorsContainer.innerHTML += `
                            <div class="item-card" style="border-left-color: #f59e0b;">
                                <h4>${req.mentorName}</h4>
                                <p>Status: <strong>${req.status || 'Pending'}</strong></p>
                                <p>Requested: ${new Date(req.requestDate).toLocaleDateString()}</p>
                            </div>
                        `;
                    });
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
                ideasContainer.innerHTML = '<p style="color:red;">Error loading data. Is the backend server running?</p>';
            }
        }
        loadProgress();
    }
    
    // --- TICKING OFF TASKS LOGIC (Placeholder for your UI) ---
    // function markTaskCompleted(taskId) { ... }
});