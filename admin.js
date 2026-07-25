document.addEventListener("DOMContentLoaded", () => {
    // 🚀 WAKE UP RENDER BACKEND
    fetch('https://entireskillhub-backend.onrender.com/').catch(()=>console.log("Backend waking up..."));
    
    loadRealStatsFromDB();
    loadPendingMentorsFromDB();
    loadPendingContentFromDB(); // Yahan function call add kar diya
});

// --- 1. LOAD REAL STATS FROM DB ---
async function loadRealStatsFromDB() {
    try {
        const res = await fetch('https://entireskillhub-backend.onrender.com/api/admin-stats');
        const stats = await res.json();
        
        document.getElementById('stat-users').innerText = stats.totalStudents || "0"; 
        document.getElementById('stat-mentors').innerText = stats.activeMentors || "0"; 
        document.getElementById('stat-ideas').innerText = stats.bookmarkedIdeas || "0";
        document.getElementById('stat-pending').innerText = stats.pendingContent || "0";
    } catch (error) {
        console.log("Could not fetch stats, falling back to local defaults.");
        document.getElementById('stat-users').innerText = "12"; 
        document.getElementById('stat-mentors').innerText = "4"; 
        document.getElementById('stat-ideas').innerText = "8";
        document.getElementById('stat-pending').innerText = "0";
    }
}

// --- 2. LOAD PENDING MENTORS FROM DB ---
async function loadPendingMentorsFromDB() {
    const container = document.getElementById('pending-mentors-container');
    if (!container) return;
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
                    <h4 style="margin-bottom: 15px; font-size: 1.1rem;">${mentor.name}</h4>
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

// --- 3. LOAD UPLOADED CONTENT FROM DB (NAYA FUNCTION) ---
async function loadPendingContentFromDB() {
    // Admin dashboard me ye ID zarur honi chahiye 
    const container = document.getElementById('pending-content-container') || document.querySelector('.pending-content-list') || document.querySelector('.pending-training-content'); 
    if(!container) return;
    
    container.innerHTML = '<p>Loading pending content...</p>';

    try {
        const res = await fetch('https://entireskillhub-backend.onrender.com/api/pending-content');
        const contents = await res.json();

        container.innerHTML = '';
        if(!contents || contents.length === 0) {
            container.innerHTML = '<p style="color: #64748b; margin-top: 15px; font-weight: bold;">✨ No pending training content.</p>';
            return;
        }

        contents.forEach((content) => {
            container.innerHTML += `
                <div class="request-card" id="content-req-${content._id}" style="border-left-color: #3b82f6; margin-bottom: 15px;">
                    <h4 style="margin-bottom: 5px; font-size: 1.1rem;">${content.title}</h4>
                    <p style="font-size: 0.9rem; color: #64748b;"><strong>Type:</strong> ${content.type} | <strong>Category:</strong> ${content.category}</p>
                    <p style="font-size: 0.9rem; color: #64748b;"><strong>Uploaded By:</strong> ${content.uploadedBy}</p>
                    <a href="${content.url}" target="_blank" style="display: inline-block; margin: 10px 0; color: #3b82f6; text-decoration: underline; font-weight: bold; font-size: 0.9rem;">🔗 View Link</a>
                    
                    <div class="btn-group" style="margin-top: 10px;">
                        <button class="btn btn-accept" onclick="approveContentDB('${content._id}')" style="background: #10b981; color: white;">Approve</button>
                        <button class="btn btn-decline" onclick="deleteContentDB('${content._id}')" style="background: #ef4444; color: white;">Delete</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        container.innerHTML = '<p style="color: #ef4444; margin-top: 15px; font-weight: bold;">❌ Failed to load content.</p>';
    }
}

// --- 4. ACTION FUNCTIONS (SYNCED WITH DB) ---
window.approveMentorDB = async function(id, mentorName) {
    if (typeof showNotification === "function") showNotification(`⏳ Verifying ${mentorName}...`, true);
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
    if (typeof showNotification === "function") showNotification(`⏳ Publishing Content...`, true);
    try {
        await fetch('https://entireskillhub-backend.onrender.com/api/approve-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contentId: id })
        });
        const reqCard = document.getElementById(`content-req-${id}`);
        if(reqCard) reqCard.remove();
        if (typeof showNotification === "function") showNotification(`🎉 Content Published Successfully!`, true);
        loadRealStatsFromDB();
    } catch (e) {
        console.log("DB Approval error", e);
    }
};

window.deleteContentDB = async function(id) {
    if (!confirm("Are you sure you want to delete this content?")) return;
    
    if (typeof showNotification === "function") showNotification(`⏳ Deleting from Database...`, false);
    try {
        await fetch(`https://entireskillhub-backend.onrender.com/api/content/${id}`, {
            method: 'DELETE'
        });
        const reqCard = document.getElementById(`content-req-${id}`);
        if(reqCard) reqCard.remove();
        if (typeof showNotification === "function") showNotification(`🗑️ Content Deleted.`, false);
        loadRealStatsFromDB();
    } catch (e) {
        console.log("DB Deletion error", e);
    }
};