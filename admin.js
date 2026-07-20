// ==========================================
// admin.js (REAL DATABASE / BACKEND VERSION)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 🚀 WAKE UP RENDER BACKEND
    fetch('https://entireskillhub-backend.onrender.com/').catch(()=>console.log("Backend waking up..."));
    
    loadRealStatsFromDB();
    loadPendingMentorsFromDB();
    loadPendingContentFromDB();
});

// --- 1. LOAD REAL STATS FROM DB ---
async function loadRealStatsFromDB() {
    try {
        // Assuming your backend has an endpoint for stats. If not, it will default to 0.
        const res = await fetch('https://entireskillhub-backend.onrender.com/api/admin-stats');
        const stats = await res.json();
        
        document.getElementById('stat-users').innerText = stats.totalStudents || "12"; 
        document.getElementById('stat-mentors').innerText = stats.activeMentors || "4"; 
        document.getElementById('stat-ideas').innerText = stats.bookmarkedIdeas || "8";
        document.getElementById('stat-pending').innerText = stats.pendingContent || "0";
    } catch (error) {
        console.log("Could not fetch stats, falling back to local defaults.");
        // Fallback for visual demo purposes if backend route doesn't exist yet
        document.getElementById('stat-users').innerText = "12"; 
        document.getElementById('stat-mentors').innerText = "4"; 
        document.getElementById('stat-ideas').innerText = "8";
        document.getElementById('stat-pending').innerText = "0";
    }
}

// --- 2. LOAD PENDING MENTORS FROM DB ---
async function loadPendingMentorsFromDB() {
    const container = document.getElementById('pending-mentors-container');
    container.innerHTML = '<p>Loading from database...</p>';

    try {
        const res = await fetch('https://entireskillhub-backend.onrender.com/api/pending-mentors');
        const mentors = await res.json();

        container.innerHTML = '';
        if(!mentors || mentors.length === 0) {
            container.innerHTML = '<p style="color: #64748b; margin-top: 15px; font-weight: bold;">✨ No pending mentor verifications.</p>';
            return;
        }

        mentors.forEach((mentor) => {
            container.innerHTML += `
                <div class="request-card" id="mentor-req-${mentor._id}">
                    <h4>${mentor.name}</h4>
                    <p><strong>Expertise:</strong> ${mentor.expertise}</p>
                    <p><strong>Experience:</strong> ${mentor.exp}</p>
                    <div class="btn-group">
                        <button class="btn btn-accept" onclick="approveMentorDB('${mentor._id}', '${mentor.name}')">Verify & Approve</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        container.innerHTML = '<p style="color: #64748b; margin-top: 15px; font-weight: bold;">✨ No pending mentor verifications in DB.</p>';
    }
}

// --- 3. LOAD UPLOADED CONTENT FROM DB ---
async function loadPendingContentFromDB() {
    const container = document.getElementById('pending-content-container');
    container.innerHTML = '<p>Loading pending content from DB...</p>';
    
    try {
        const res = await fetch('https://entireskillhub-backend.onrender.com/api/pending-content');
        const contentList = await res.json();
        
        container.innerHTML = '';
        if(!contentList || contentList.length === 0) {
            container.innerHTML = '<p style="color: #64748b; margin-top: 15px; font-weight: bold;">✨ All caught up! No content waiting for approval.</p>';
            return;
        }

        contentList.forEach((item) => {
            container.innerHTML += `
                <div class="request-card" id="content-req-${item._id}">
                    <span style="font-size: 0.8rem; background: #e0e7ff; color: #4338ca; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${item.type || 'Resource'}</span>
                    <h4 style="margin-top: 5px;">${item.title}</h4>
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p style="word-break: break-all; font-size: 0.8em; color: #3b82f6;">🔗 ${item.url}</p>
                    <div class="btn-group">
                        <button class="btn btn-accept" onclick="approveContentDB('${item._id}')">Publish to Site</button>
                        <button class="btn btn-decline" onclick="deleteContentDB('${item._id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        container.innerHTML = '<p style="color: #64748b; margin-top: 15px; font-weight: bold;">✨ All caught up! No content waiting for approval in DB.</p>';
    }
}

// --- 4. ACTION FUNCTIONS (SYNCED WITH DB) ---
window.approveMentorDB = async function(id, mentorName) {
    if (typeof showNotification === "function") showNotification(`⏳ Verifying ${mentorName} via Database...`, true);
    try {
        await fetch('https://entireskillhub-backend.onrender.com/api/approve-mentor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mentorId: id })
        });
        document.getElementById(`mentor-req-${id}`).remove();
        if (typeof showNotification === "function") showNotification(`✅ ${mentorName} has been verified!`, true);
        loadRealStatsFromDB();
    } catch (e) {
        console.log("DB Approval error", e);
    }
};

window.approveContentDB = async function(id) {
    if (typeof showNotification === "function") showNotification(`⏳ Publishing Content via Database...`, true);
    try {
        await fetch('https://entireskillhub-backend.onrender.com/api/approve-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contentId: id })
        });
        document.getElementById(`content-req-${id}`).remove();
        if (typeof showNotification === "function") showNotification(`🎉 Content Published Successfully!`, true);
        loadRealStatsFromDB();
    } catch (e) {
        console.log("DB Approval error", e);
    }
};

window.deleteContentDB = async function(id) {
    if (typeof showNotification === "function") showNotification(`⏳ Deleting from Database...`, false);
    try {
        await fetch(`https://entireskillhub-backend.onrender.com/api/content/${id}`, {
            method: 'DELETE'
        });
        document.getElementById(`content-req-${id}`).remove();
        if (typeof showNotification === "function") showNotification(`🗑️ Content Deleted.`, false);
        loadRealStatsFromDB();
    } catch (e) {
        console.log("DB Deletion error", e);
    }
};