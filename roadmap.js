// ==========================================
// 5. roadmap.js (Dynamic Roadmap Generator)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const roadmapStepsContainer = document.getElementById('roadmap-steps');
    
    if (roadmapStepsContainer) {
        // Dynamic Database Simulation
        const roadmapsData = {
            'Cloud Kitchen / Tiffin Service': {
                title: 'Start a Cloud Kitchen / Tiffin Service',
                intro: 'A step-by-step guide to launching a low-cost food delivery business from your home.',
                steps: [
                    { title: 'Idea Validation', content: 'Cook a small batch of your signature dishes and offer free samples.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Cooking at scale. Tools: Large utensils, delivery bags.' },
                    { title: 'Legal & Registration Steps', content: 'Register for an FSSAI Basic Registration (Food Safety License).' },
                    { title: 'Cost Estimation', content: 'Approx ₹5,000 - ₹10,000 for initial ingredients and packaging.' },
                    { title: 'Marketing Basics', content: 'Create a WhatsApp group for your society. Post daily menus.' }
                ]
            },
            'Electronics Repair Kiosk': {
                title: 'Electronics & Mobile Repair Kiosk',
                intro: 'Your guide to starting a highly demanded repair service in your local area.',
                steps: [
                    { title: 'Idea Validation', content: 'Start by offering free or low-cost screen protector installations.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Micro-soldering. Tools: Screwdriver set, multimeter.' },
                    { title: 'Legal & Registration Steps', content: 'Register as a Sole Proprietorship. Obtain a local license.' },
                    { title: 'Cost Estimation', content: 'Approx ₹15,000 - ₹25,000 for a basic toolkit and spare parts.' },
                    { title: 'Marketing Basics', content: 'Partner with local mobile accessory shops for referrals.' }
                ]
            }
            // (You can add the other roadmaps here)
        };

        const urlParams = new URLSearchParams(window.location.search);
        const ideaKey = urlParams.get('idea'); 
        
        // Load the data based on the URL
        const data = roadmapsData[ideaKey] || roadmapsData['Cloud Kitchen / Tiffin Service'];

        if (data) {
            document.getElementById('roadmap-title').innerText = data.title;
            document.getElementById('roadmap-intro').innerText = data.intro;
            
            // Clear out "Loading Roadmap..." and inject the data
            roadmapStepsContainer.innerHTML = '';
            
            data.steps.forEach((step, index) => {
                roadmapStepsContainer.innerHTML += `
                    <div class="step-card">
                        <h3><span class="step-number">${index + 1}</span> ${step.title}</h3>
                        <p>${step.content}</p>
                    </div>
                `;
            });
        }
    }
});