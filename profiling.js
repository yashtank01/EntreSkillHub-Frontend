// ==========================================
// profiling.js (Skill Selection Logic)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // 1. Toggle the Blue Border when a card is clicked
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            // This adds or removes the "selected" class every time you click
            card.classList.toggle('selected');
        });
    });

    // 2. Handle the "Find My Business Ideas" button click
    const findIdeasBtn = document.getElementById('find-ideas-btn'); 
    
    if (findIdeasBtn) {
        findIdeasBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop page from reloading
            
            const selectedSkills = [];
            
            // 3. Find all cards that currently have the blue border (.selected)
            document.querySelectorAll('.skill-card.selected').forEach(selectedCard => {
                const skillName = selectedCard.getAttribute('data-skill');
                if (skillName) {
                    selectedSkills.push(skillName);
                }
            });

            // 4. Warn the user if they didn't click anything
            if (selectedSkills.length === 0) {
                if (typeof showNotification === "function") {
                    showNotification("⚠️ Please select at least one skill to continue!", false);
                } else {
                    alert("Please select at least one skill to continue!");
                }
                return;
            }

            // 5. Save the selected skills to memory so Dashboard can read them
            localStorage.setItem("userSkills", JSON.stringify(selectedSkills));
            
            // 6. Redirect to the Dashboard!
            window.location.href = "dashboard.html";
        });
    }
});