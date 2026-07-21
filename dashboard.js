// ==========================================
// 3. dashboard.js (FINAL WITH FULL RESOURCES & DB)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // --- 🚀 WAKE UP RENDER BACKEND ---
    fetch('https://entireskillhub-backend.onrender.com/').catch(()=>console.log("Backend waking up..."));

    // --- DASHBOARD USER NAME & EMAIL LOGIC ---
    const urlParams = new URLSearchParams(window.location.search);
    const urlName = urlParams.get('name');
    const urlEmail = urlParams.get('email'); // Catch the email from backend!

    // If new login, save details to LocalStorage
    if (urlName) localStorage.setItem('userName', urlName);
    if (urlEmail) localStorage.setItem('userEmail', urlEmail); // Save new email

    // Display welcome message
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        const welcomeHeading = document.getElementById('welcome-message');
        if (welcomeHeading) welcomeHeading.innerText = `Welcome back, ${savedName}! 👋`;
        
        // Clean up URL so it looks professional
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    loadBusinessIdeas();
    loadLearningResources();
    loadMentors();
});

// ==========================================
// --- 1. LOAD & FILTER BUSINESS IDEAS ---
// ==========================================
function loadBusinessIdeas() {
    const ideasFeed = document.getElementById('business-ideas-feed');
    if (!ideasFeed) return; 

    const savedSkills = JSON.parse(localStorage.getItem("userSkills") || "[]");

    const allIdeas = [
        // --- Food Preparation & Baking ---
        { title: "Cloud Kitchen", skill: "Food Preparation & Baking", desc: "Start an online-only food delivery business from your home using apps like Swiggy or Zomato.", videoUrl: "https://www.youtube.com/embed/WctJ4Km-fCE" },
        { title: "Daily Tiffin Service", skill: "Food Preparation & Baking", desc: "Provide affordable, daily home-cooked meals to local students and office workers.", videoUrl: "https://www.youtube.com/embed/469jGbNBPjg" },
        { title: "Custom Cake & Baking Business", skill: "Food Preparation & Baking", desc: "Bake and decorate cakes for birthdays, weddings, and local events.", videoUrl: "https://www.youtube.com/embed/-YkkFC_wo_8" },
        { title: "Homemade Pickles & Preserves", skill: "Food Preparation & Baking", desc: "Create and sell artisanal packaged goods locally and online.", videoUrl: "https://www.youtube.com/embed/oJwj1dOCI0Y" },

        // --- Tailoring & Sewing ---
        { title: "Local Boutique & Alterations", skill: "Tailoring & Sewing", desc: "Turn your sewing skills into a profitable local fashion business.", videoUrl: "https://www.youtube.com/embed/IJtSsy5Gl30" },
        { title: "Custom Embroidery Services", skill: "Tailoring & Sewing", desc: "Personalize clothing, bags, and uniforms for local businesses and schools.", videoUrl: "https://www.youtube.com/embed/8Ssp1zBcIV4" },
        { title: "Clothing Upcycling & Thrifting", skill: "Tailoring & Sewing", desc: "Repair, restyle, and resell vintage or thrifted clothing.", videoUrl: "https://www.youtube.com/embed/6HNyopcpiFE" },
        { title: "Home Decor & Drapery", skill: "Tailoring & Sewing", desc: "Sew custom curtains, pillow covers, and linens for home interiors.", videoUrl: "https://www.youtube.com/embed/ol-NBB5ctWI" },

        // --- Basic Digital Skills ---
        { title: "Virtual Assistant Services", skill: "Basic Digital Skills", desc: "Offer remote admin, email, and schedule management to clients globally.", videoUrl: "https://www.youtube.com/embed/gTiBHQ1HL4Y" },
        { title: "Social Media Management", skill: "Basic Digital Skills", desc: "Manage Facebook or Instagram pages for local businesses using Canva.", videoUrl: "https://www.youtube.com/embed/u4Xjmfk7lI0" },
        { title: "Selling Digital Templates", skill: "Basic Digital Skills", desc: "Design and sell budget-friendly planners and templates on platforms like Etsy.", videoUrl: "https://www.youtube.com/embed/k9EP2eI1lgI" },
        { title: "Online Tutoring & Coaching", skill: "Basic Digital Skills", desc: "Teach students online through video calls in your area of expertise.", videoUrl: "https://www.youtube.com/embed/bcnF40lTp4c" },

        // --- Handicrafts & Arts ---
        { title: "Handmade Crafts & Etsy Shop", skill: "Handicrafts & Arts", desc: "Sell your custom crafts and artwork locally or on online marketplaces.", videoUrl: "https://www.youtube.com/embed/nj9wn7YhQPA" },
        { title: "Resin Art & Jewelry Making", skill: "Handicrafts & Arts", desc: "Create trending custom jewelry, coasters, and keychains from home.", videoUrl: "https://www.youtube.com/embed/q6Qn8eN_yU4" },
        { title: "Custom Portraits & Illustrations", skill: "Handicrafts & Arts", desc: "Offer commissioned artwork or digital portraits for clients.", videoUrl: "https://www.youtube.com/embed/4TJSf8jXCvE" },
        { title: "Eco-friendly Packaging & Bags", skill: "Handicrafts & Arts", desc: "Produce sustainable, handmade packaging and paper bags for local shops.", videoUrl: "https://www.youtube.com/embed/72MDe6eUIIs" }
    ];

    let matchingIdeas = savedSkills.length > 0 ? allIdeas.filter(idea => savedSkills.includes(idea.skill)) : allIdeas;
    ideasFeed.innerHTML = ''; 

    matchingIdeas.forEach(idea => {
        const card = document.createElement('div');
        card.className = 'idea-card'; 
        card.innerHTML = `
            <div class="card-badge" style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; display: inline-block; margin-bottom: 10px;">${idea.skill}</div>
            <h3 style="margin-bottom: 5px;">${idea.title}</h3>
            <p style="color: #64748b; margin-bottom: 15px;">${idea.desc}</p>
            <div class="video-container" style="margin-bottom: 15px;">
                <iframe src="${idea.videoUrl}" style="width: 100%; height: 180px; border-radius: 8px; border: none;" allowfullscreen></iframe>
            </div>
            
            <button class="btn btn-outline" onclick="bookmarkAndRedirect(this, '${idea.title}')" style="width: 100%; padding: 12px; font-size: 1rem; margin-top: auto; border-color: #3b82f6; color: #3b82f6;">🔖 Bookmark & View Roadmap ➔</button>
        `;
        ideasFeed.appendChild(card);
    });
}

// ==========================================
// --- 2. BOOKMARK & REDIRECT LOGIC ---
// ==========================================
window.bookmarkAndRedirect = async function(buttonElement, ideaTitle) {
    const userEmail = localStorage.getItem("userEmail") || "testuser@demo.com";
    
    buttonElement.innerText = "Saving & Redirecting...";
    buttonElement.style.backgroundColor = "#3b82f6";
    buttonElement.style.color = "white";
    buttonElement.disabled = true;

    try {
        await fetch('https://entireskillhub-backend.onrender.com/api/save-idea', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idea: ideaTitle, email: userEmail })
        });
        
        if (typeof showNotification === "function") showNotification(`✅ Opening Roadmap for ${ideaTitle}...`, true);
        
        setTimeout(() => {
            window.location.href = `roadmap.html?idea=${encodeURIComponent(ideaTitle)}`;
        }, 1200);

    } catch (error) {
        console.error("DB Error:", error);
        buttonElement.innerText = "❌ Connection Error";
        setTimeout(() => {
            window.location.href = `roadmap.html?idea=${encodeURIComponent(ideaTitle)}`;
        }, 1500);
    }
};

// ==========================================
// --- 3. LOAD LEARNING RESOURCES (Articles & Checklists) ---
// ==========================================
function loadLearningResources() {
    const resourcesFeed = document.getElementById('learning-resources-feed');
    if (!resourcesFeed) return;

    const savedSkills = JSON.parse(localStorage.getItem("userSkills") || "[]");

    // NEW: Exactly 1 Article and 1 Checklist per skill!
    const allResources = [
        // Universal
        { title: "Ultimate Business Launch Checklist", type: "Checklist", skill: "Universal", desc: "Don't miss a single step before launching your micro-business.", link: "https://www.score.org/resource/template/business-plan-checklist" },
        { title: "5 Free Marketing Strategies on Instagram", type: "Article", skill: "Universal", desc: "Learn how to use Reels and Stories to get local clients.", link: "https://business.instagram.com/blog/5-free-ways-to-grow-your-business-on-instagram" },

        // Food Preparation
        { title: "How to Get Your FSSAI License Online", type: "Article", skill: "Food Preparation & Baking", desc: "A complete step-by-step guide to registering your food business in India.", link: "https://www.fssai.gov.in/" },
        { title: "Cloud Kitchen Hygiene & Safety Checklist", type: "Checklist", skill: "Food Preparation & Baking", desc: "Ensure your home kitchen meets commercial safety standards.", link: "https://www.posist.com/restaurant-times/cloud-kitchen/cloud-kitchen-safety-checklist.html" },

        // Tailoring & Sewing
        { title: "Where to Source Wholesale Fabric in India", type: "Article", skill: "Tailoring & Sewing", desc: "A guide to the best textile markets for sourcing cheap, high-quality fabric.", link: "https://textilelearner.net/wholesale-fabric-markets-in-india/" },
        { title: "Boutique Setup & Equipment Checklist", type: "Checklist", skill: "Tailoring & Sewing", desc: "Everything you need from sewing machines to threads before opening.", link: "https://sewing.com/sewing-room-checklist/" },

        // Basic Digital Skills
        { title: "How to Get Your First Client on Upwork", type: "Article", skill: "Basic Digital Skills", desc: "Proven proposal templates and strategies to win your first freelance gig.", link: "https://www.upwork.com/resources/how-to-get-first-job-on-upwork" },
        { title: "Freelancer Profile Setup Checklist", type: "Checklist", skill: "Basic Digital Skills", desc: "A 10-step checklist to make your Upwork or Fiverr profile stand out.", link: "https://www.fiverr.com/resources/guides/freelance-career/how-to-create-a-fiverr-profile" },

        // Handicrafts & Arts
        { title: "How to Price Your Handmade Art", type: "Article", skill: "Handicrafts & Arts", desc: "Stop undercharging! Learn the formula for pricing your materials and labor.", link: "https://www.etsy.com/seller-handbook/article/how-to-price-like-a-pro/227462276973" },
        { title: "Etsy Shop Setup & SEO Checklist", type: "Checklist", skill: "Handicrafts & Arts", desc: "Optimize your product listings and tags to rank higher on Etsy search.", link: "https://www.etsy.com/seller-handbook/article/the-ultimate-guide-to-etsy-search/366469415790" }
    ];

    let matchingResources = allResources.filter(resource => resource.skill === "Universal" || savedSkills.includes(resource.skill));
    if (savedSkills.length === 0) matchingResources = allResources;

    resourcesFeed.innerHTML = ''; 

    matchingResources.forEach(resource => {
        let icon = resource.type === "Checklist" ? "✅" : "📄";
        let color = resource.type === "Checklist" ? "#10b981" : "#3b82f6"; 

        const card = document.createElement('div');
        card.className = 'idea-card';
        card.style.borderLeft = `5px solid ${color}`; 

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 0.8rem; background: #334155; padding: 4px 8px; border-radius: 4px; color: white; font-weight: bold;">${resource.skill === 'Universal' ? 'General' : 'Niche'}</span>
                <span style="font-size: 0.85rem; font-weight: bold; color: ${color};">${icon} ${resource.type}</span>
            </div>
            <h4 style="margin: 0 0 5px 0; font-size: 1.1rem;">${resource.title}</h4>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">${resource.desc}</p>
            <a href="${resource.link}" target="_blank" style="margin-top: auto; color: ${color}; text-decoration: none; font-size: 0.9rem; font-weight: bold;">Open ${resource.type} ➔</a>
        `;
        resourcesFeed.appendChild(card);
    });
}

// ==========================================
// --- 4. LOAD MENTORS ---
// ==========================================
function loadMentors() {
    const mentorsFeed = document.getElementById('mentors-feed');
    if (!mentorsFeed) return;

    const savedSkills = JSON.parse(localStorage.getItem("userSkills") || "[]");

    const allMentors = [
        { name: "Priya Patel", skill: "Food Preparation & Baking", exp: "8 Years - Cloud Kitchen Founder", expertise: "FSSAI Registration, Zomato Onboarding, Baking Setup" },
        { name: "Chef Aman Singh", skill: "Food Preparation & Baking", exp: "12 Years - Culinary Expert", expertise: "Bulk Cooking (Tiffins), Pickles & Preserves, Costing" },
        
        { name: "Anita Sharma", skill: "Tailoring & Sewing", exp: "15 Years - Boutique Owner", expertise: "Custom Embroidery, Upcycling Clothes, Local Marketing" },
        { name: "Meera Textile Co.", skill: "Tailoring & Sewing", exp: "10 Years - Factory & Retail", expertise: "Wholesale Fabric Sourcing, Home Decor & Drapery" },
        
        { name: "Rahul Verma", skill: "Basic Digital Skills", exp: "Top-Rated Plus Upwork VA", expertise: "Virtual Assistance, Client Acquisition, Online Tutoring" },
        { name: "Neha Gupta", skill: "Basic Digital Skills", exp: "Digital Creator & Manager", expertise: "Canva Social Media Design, Etsy Digital Templates" },
        
        { name: "Kavya Creations", skill: "Handicrafts & Arts", exp: "Top 1% Etsy Seller in India", expertise: "Resin Art, Custom Jewelry, International Shipping" },
        { name: "Arjun Crafts", skill: "Handicrafts & Arts", exp: "10 Years - Sustainable Arts", expertise: "Custom Portraits, Eco-friendly Packaging, B2B Sales" }
    ];

    let matchingMentors = savedSkills.length > 0 ? allMentors.filter(mentor => savedSkills.includes(mentor.skill)) : allMentors;
    mentorsFeed.innerHTML = ''; 

    matchingMentors.forEach(mentor => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.style.borderTop = '4px solid #f59e0b'; 
        
        card.innerHTML = `
            <div class="card-badge" style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; display: inline-block; margin-bottom: 10px;">${mentor.skill}</div>
            <h3 style="margin-bottom: 10px;">${mentor.name}</h3>
            <p><strong>Expertise:</strong> ${mentor.expertise}</p>
            <p><strong>Experience:</strong> ${mentor.exp}</p>
            <button class="btn" style="background-color: #f59e0b; color: white; width: 100%; margin-top: auto;" onclick="requestMentorDB(this, '${mentor.name}')">Request Session</button>
        `;
        mentorsFeed.appendChild(card);
    });
}

// ==========================================
// --- 5. REQUEST MENTOR LOGIC (REAL DATABASE) ---
// ==========================================
window.requestMentorDB = async function(buttonElement, mentorName) {
    const userEmail = localStorage.getItem("userEmail") || "testuser@demo.com";
    
    buttonElement.innerText = "Sending Request...";
    buttonElement.disabled = true;

    try {
        const response = await fetch('https://entireskillhub-backend.onrender.com/api/request-mentor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mentor: mentorName, email: userEmail }) 
        });

       if (response.ok) {
            buttonElement.innerText = "Request Sent!";
            buttonElement.style.backgroundColor = "#10b981"; 
            buttonElement.style.color = "white";
            if (typeof showNotification === "function") showNotification(`🎉 Request sent to ${mentorName}.`, true);
        } else {
            buttonElement.innerText = "Already Requested";
            if (typeof showNotification === "function") showNotification(`⚠️ You have already requested this mentor.`, false);
        }
    } catch (error) {
        buttonElement.innerText = "❌ Error";
    }
};