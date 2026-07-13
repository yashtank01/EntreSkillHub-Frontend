// ==========================================
// 7. admin.js (Admin Stats & Error Logs)
// ==========================================

function adminAction(elementId, actionStatus) {
    const item = document.getElementById(elementId);
    if (!item) return;

    if (actionStatus === 'Approved' || actionStatus === 'Published') {
        showNotification(`✅ Success! Item has been ${actionStatus.toLowerCase()}.`, true);
    } else {
        showNotification(`🗑️ Item has been ${actionStatus.toLowerCase()} and removed.`, false);
    }
    
    item.style.opacity = '0.5';
    setTimeout(() => {
        item.style.display = 'none';
    }, 500);
}

// --- ADMIN STATS & LOGS (Placeholders) ---
// async function fetchUserStats() { ... }
// async function viewErrorLogs() { ... }