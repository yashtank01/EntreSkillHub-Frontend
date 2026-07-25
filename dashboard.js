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


//LOAD & FILTER BUSINESS IDEAS

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
        { title: "Resin Art & Jewelry Making", skill: "Handicrafts & Arts", desc: "Create trending custom jewelry, coasters, and keychains from home.", videoUrl: "https://www.youtube.com/embed/ImoZjQNYyZI" },
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


//BOOKMARK & REDIRECT LOGIC ---

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

//  LOAD LEARNING RESOURCES (Articles & Checklists)

function loadLearningResources() {
    const container = document.getElementById('learning-resources-feed') || document.querySelector('.learning-resources-list');
    if(!container) return;

    const savedSkills = JSON.parse(localStorage.getItem("userSkills") || "[]");


const allResources = [
    // 🍳 FOOD PREPARATION & BAKING
    { skill: "Food Preparation & Baking", type: "Article", title: "How to Get Your FSSAI License", desc: "Step-by-step guide to registering your food business in India.", url: "https://indiafilings.com" },
    { skill: "Food Preparation & Baking", type: "Article", title: "Pricing Strategy for Homemade Food", desc: "Learn how to calculate costs and set profitable prices for meals.", url: "https://toasttab.com" },
    { skill: "Food Preparation & Baking", type: "Checklist", title: "Commercial Kitchen Hygiene Checklist", desc: "Ensure your home kitchen meets commercial safety standards.", url: "https://webstaurantstore.com" },
    { skill: "Food Preparation & Baking", type: "Checklist", title: "Baking Equipment Startup Checklist", desc: "Essential tools you need before taking your first big cake order.", url: "https://webstaurantstore.com" },

    // 🧵 TAILORING & SEWING
    { skill: "Tailoring & Sewing", type: "Article", title: "How to Start a Clothing Boutique", desc: "A complete guide to opening a successful tailoring or clothing shop.", url: "https://forbes.com" },
    { skill: "Tailoring & Sewing", type: "Article", title: "Marketing Guide for Small Businesses", desc: "Get more local clients using effective digital marketing strategies.", url: "https://hubspot.com" },
    { skill: "Tailoring & Sewing", type: "Checklist", title: "Boutique Inventory Management", desc: "Must-have fabrics, threads, and tools to always keep in stock.", url: "https://www.shopify.com" },
    { skill: "Tailoring & Sewing", type: "Checklist", title: "Garment Quality Control Checklist", desc: "Ensure every stitched piece is perfect before delivering to customers.", url: "https://www.intouch-quality.com" },

    // 💻 BASIC DIGITAL SKILLS
    { skill: "Basic Digital Skills", type: "Article", title: "Optimizing Your Upwork Profile", desc: "Stand out to international clients with a professional freelance profile.", url: "https://upwork.com" },
    { skill: "Basic Digital Skills", type: "Article", title: "Instagram Marketing for Freelancers", desc: "Use Reels and portfolio posts to attract high-paying clients.", url: "https://hubspot.com" },
    { skill: "Basic Digital Skills", type: "Checklist", title: "Client Onboarding Checklist", desc: "Step-by-step checklist to welcome and onboard new clients smoothly.", url: "https://hubspot.com" },
    { skill: "Basic Digital Skills", type: "Checklist", title: "Social Media Audit Checklist", desc: "Evaluate and improve your client's social media presence.", url: "https://hootsuite.com" },

    // 🎨 HANDICRAFTS & ARTS
    { skill: "Handicrafts & Arts", type: "Article", title: "How to Sell Crafts on Etsy", desc: "The ultimate guide to setting up your first international craft store.", url: "https://etsy.com" },
    { skill: "Handicrafts & Arts", type: "Article", title: "Packaging Tips for Fragile Arts", desc: "Learn how to pack resin, glass, and clay items safely for shipping.", url: "https://fedex.com" },
    { skill: "Handicrafts & Arts", type: "Checklist", title: "10 Steps to Start Your Business", desc: "Don't miss a single step before publishing your first craft listing.", url: "https://sba.gov" },
    { skill: "Handicrafts & Arts", type: "Checklist", title: "Craft Fair & Exhibition Checklist", desc: "Everything you need to pack for selling at local physical markets.", url: "https://www.shopify.com" }
];
    let matchingResources = savedSkills.length > 0 ? allResources.filter(res => savedSkills.includes(res.skill)) : allResources;
    container.innerHTML = ''; 

    matchingResources.forEach(res => {
        let icon = res.type === "Checklist" ? "✅" : "📄";
        let color = res.type === "Checklist" ? "#10b981" : "#3b82f6"; 
        
        let tagColor = "#e2e8f0"; 
        if(res.skill === "Food Preparation & Baking") tagColor = "rgb(249, 133, 0)"; 
        if(res.skill === "Tailoring & Sewing") tagColor = "rgb(249, 133, 0)"; 
        if(res.skill === "Basic Digital Skills") tagColor ="rgb(249, 133, 0)"; 
        if(res.skill === "Handicrafts & Arts") tagColor = "rgb(249, 133, 0)"; 

        const card = document.createElement('div');
        card.className = 'idea-card';
        card.style.borderLeft = `5px solid ${color}`; 

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 0.75rem; background: ${tagColor}; padding: 4px 8px; border-radius: 6px; color: #0f172a; font-weight: bold; text-transform: uppercase;">${res.skill}</span>
                <span style="font-size: 0.85rem; font-weight: bold; color: ${color};">${icon} ${res.type}</span>
            </div>
            <h4 style="margin: 0 0 5px 0; font-size: 1.1rem;">${res.title}</h4>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">${res.desc}</p>
            <a href="${res.url}" target="_blank" style="margin-top: auto; display: inline-block; background: ${color}; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 0.85rem; transition: 0.2s; text-align: center;">View ${res.type} ➔</a>
        `;
        container.appendChild(card);
    });
}


// LOAD MENTORS 

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


//REQUEST MENTOR LOGIC (REAL DATABASE) 
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