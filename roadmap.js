// ==========================================
// 5. roadmap.js (Dynamic Roadmap Generator)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const roadmapStepsContainer = document.getElementById('roadmap-steps');
    
    if (roadmapStepsContainer) {
        // Complete Indian Business Database covering all 17 Ideas (PRD Compliant)
        const roadmapsData = {
            // --- FOOD & BAKING ---
            'Cloud Kitchen': {
                title: 'Start a Cloud Kitchen',
                intro: 'Launch a highly profitable online food delivery business from your home kitchen.',
                steps: [
                    { title: 'Idea Validation', content: 'Cook a small batch of your signature dishes. Give free samples to neighbors or local office workers and ask for honest feedback on taste and packaging.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Bulk cooking, inventory management. Tools: Commercial-grade utensils, a reliable stove, and quality spill-proof plastic/foil packaging.' },
                    { title: 'Legal & Registration Steps', content: 'Mandatory: FSSAI Basic Registration (₹100/year). Optional: Register as an MSME on the Udyam portal for government benefits.' },
                    { title: 'Cost Estimation', content: 'Approx ₹8,000 - ₹15,000. Covers FSSAI license, initial grocery stock, branded packaging, and Swiggy/Zomato onboarding fees.' },
                    { title: 'Marketing Basics', content: 'Create a WhatsApp Business catalog. Run targeted ₹200/day Instagram ads in a 5km radius to attract local foodies.' }
                ]
            },
            'Daily Tiffin Service': {
                title: 'Start a Daily Tiffin Service',
                intro: 'Provide affordable, daily home-cooked meals to students and office workers.',
                steps: [
                    { title: 'Idea Validation', content: 'Visit local PGs or corporate hubs. Ask students/workers what they miss about home food and how much they’d pay for a daily lunch box.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Time management and consistent taste. Tools: Bulk stainless steel tiffin carriers, thermal delivery bags, and local transport.' },
                    { title: 'Legal & Registration Steps', content: 'FSSAI Basic Registration is legally required to serve food. Obtain commercial insurance if delivering via two-wheeler.' },
                    { title: 'Cost Estimation', content: 'Approx ₹5,000 - ₹10,000. Primarily spent on buying bulk tiffins, initial raw materials, and printing pamphlets.' },
                    { title: 'Marketing Basics', content: 'Distribute flyers outside local PGs and hostels. Offer a discounted "3-Day Trial" to hook long-term monthly subscribers.' }
                ]
            },
            'Custom Cake & Baking Business': {
                title: 'Custom Cake & Baking Business',
                intro: 'Turn your baking passion into a profitable home-based cake business.',
                steps: [
                    { title: 'Idea Validation', content: 'Bake for family events first. Take high-quality photos of your cakes to build an initial portfolio.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Icing, fondant work, and temperature control. Tools: OTG Oven, cake molds, turntable, piping bags, and cake boxes.' },
                    { title: 'Legal & Registration Steps', content: 'FSSAI Basic Registration. Apply for Udyam (MSME) to legitimize your home bakery.' },
                    { title: 'Cost Estimation', content: 'Approx ₹10,000 - ₹20,000 (If buying a new OTG oven and professional baking tools).' },
                    { title: 'Marketing Basics', content: 'Instagram is key! Post Reels of your cake decorating process. Partner with local event planners for bulk orders.' }
                ]
            },
            'Homemade Pickles & Preserves': {
                title: 'Homemade Pickles & Preserves',
                intro: 'Create and sell artisanal packaged goods locally and online.',
                steps: [
                    { title: 'Idea Validation', content: 'Test your recipe shelf-life. Give jars to friends to ensure the pickles don’t spoil quickly under normal room temperature.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Preservation techniques, hygiene. Tools: Large glass/ceramic jars, bulk spices, oil, and custom printed labels.' },
                    { title: 'Legal & Registration Steps', content: 'FSSAI Registration is strict for packaged foods. You also need an FSSAI label with manufacturing dates on the jars.' },
                    { title: 'Cost Estimation', content: 'Approx ₹3,000 - ₹8,000 for bulk ingredients, glass jars, and label printing.' },
                    { title: 'Marketing Basics', content: 'Set up a stall at local society melas or flea markets. Sell online via Amazon Local or WhatsApp Business.' }
                ]
            },

            // --- TAILORING & SEWING ---
            'Local Boutique & Alterations': {
                title: 'Local Boutique & Alterations',
                intro: 'Turn your sewing skills into a profitable local fashion business.',
                steps: [
                    { title: 'Idea Validation', content: 'Offer free or highly discounted alteration services to 5 friends. Use their testimonials to prove your skill.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Measurement taking, fabric cutting. Tools: Motorized sewing machine, measuring tapes, chalk, threads.' },
                    { title: 'Legal & Registration Steps', content: 'Register under the Shops and Establishment Act (Gumastha License) if opening a physical shop. Udyam MSME registration for loans.' },
                    { title: 'Cost Estimation', content: 'Approx ₹15,000 - ₹35,000. Covers a good sewing machine (Usha/Singer) and basic shop setup.' },
                    { title: 'Marketing Basics', content: 'Partner with local dry-cleaners who can refer clients needing alterations. Start an Instagram page for custom designs.' }
                ]
            },
            'Custom Embroidery Services': {
                title: 'Custom Embroidery Services',
                intro: 'Personalize clothing and uniforms for local businesses and schools.',
                steps: [
                    { title: 'Idea Validation', content: 'Embroider a few sample school logos or corporate names on spare shirts to showcase your precision.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Hand embroidery or machine operation. Tools: Embroidery hoops, specialized threads, or a basic embroidery machine.' },
                    { title: 'Legal & Registration Steps', content: 'Udyam Registration as a micro-enterprise. GST registration only needed if crossing ₹20 Lakh turnover.' },
                    { title: 'Cost Estimation', content: 'Approx ₹2,000 for hand-embroidery setup, or ₹40,000+ if buying an automated embroidery machine.' },
                    { title: 'Marketing Basics', content: 'Approach local schools, security agencies, and corporate offices directly for bulk uniform logo orders.' }
                ]
            },
            'Clothing Upcycling & Thrifting': {
                title: 'Clothing Upcycling & Thrifting',
                intro: 'Repair, restyle, and resell vintage or thrifted clothing.',
                steps: [
                    { title: 'Idea Validation', content: 'Buy 5 cheap, oversized shirts from a thrift market. Restyle them and see if they sell on Instagram.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Fashion sense, basic tailoring. Tools: Sewing machine, fabric dyes, scissors, and a good smartphone camera.' },
                    { title: 'Legal & Registration Steps', content: 'Udyam Registration. If selling online across India, GST registration is highly recommended.' },
                    { title: 'Cost Estimation', content: 'Approx ₹5,000 - ₹10,000 for initial thrift sourcing, cleaning, and upcycling materials.' },
                    { title: 'Marketing Basics', content: 'Aesthetic Instagram Reels are your best friend. Build a "Thrift Store" brand targeting Gen-Z.' }
                ]
            },
            'Home Decor & Drapery': {
                title: 'Home Decor & Drapery',
                intro: 'Sew custom curtains, pillow covers, and linens for home interiors.',
                steps: [
                    { title: 'Idea Validation', content: 'Make a premium matching set of curtains and cushion covers for your own home. Use it as your primary catalog showcase.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Heavy fabric sewing, precision measuring. Tools: Heavy-duty sewing machine, large cutting tables.' },
                    { title: 'Legal & Registration Steps', content: 'Udyam Registration (MSME). Can operate fully as a home-based sole proprietorship.' },
                    { title: 'Cost Estimation', content: 'Approx ₹10,000 - ₹20,000 for a heavy-duty machine and wholesale fabric sourcing.' },
                    { title: 'Marketing Basics', content: 'Network with local interior designers and furniture shops. They frequently need custom drapery for their clients.' }
                ]
            },

            // --- DIGITAL SKILLS ---
            'Virtual Assistant Services': {
                title: 'Virtual Assistant Services',
                intro: 'Offer remote admin and schedule management to clients globally.',
                steps: [
                    { title: 'Idea Validation', content: 'Offer to manage a busy friend or local business owner’s email inbox for one week for free to test your workflow.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Email management, MS Office/Google Workspace. Tools: A reliable laptop and high-speed internet.' },
                    { title: 'Legal & Registration Steps', content: 'No immediate registration required. As you grow, register as a Sole Proprietorship and get a GST number if dealing with international clients (LUT bond).' },
                    { title: 'Cost Estimation', content: 'Approx ₹0 - ₹2,000 (Assuming you already have a laptop/internet). Setup profiles on Upwork/Fiverr.' },
                    { title: 'Marketing Basics', content: 'Optimize your LinkedIn profile. Pitch your services to startup founders and busy real estate agents directly via DM.' }
                ]
            },
            'Social Media Management': {
                title: 'Social Media Management',
                intro: 'Manage digital pages for local businesses using tools like Canva.',
                steps: [
                    { title: 'Idea Validation', content: 'Pick a local cafe with a bad Instagram page. Design 3 free posts for them and pitch your monthly service.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Copywriting, Canva design, understanding trends. Tools: Laptop, Canva Pro subscription, Meta Business Suite.' },
                    { title: 'Legal & Registration Steps', content: 'Operate as a freelancer initially. Udyam Registration when you establish a brand name.' },
                    { title: 'Cost Estimation', content: 'Approx ₹4,000/year for Canva Pro. Extremely low barrier to entry.' },
                    { title: 'Marketing Basics', content: 'Your own Instagram page is your resume. Show, don’t just tell. Network at local business meetups.' }
                ]
            },
            'Selling Digital Templates': {
                title: 'Selling Digital Templates',
                intro: 'Design and sell budget-friendly planners and templates online.',
                steps: [
                    { title: 'Idea Validation', content: 'Design a simple weekly planner or budget tracker. Give it away for free in exchange for email addresses to gauge interest.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Graphic Design, niche research. Tools: Canva, Notion, or Excel.' },
                    { title: 'Legal & Registration Steps', content: 'GST Registration is mandatory for selling digital goods on most Indian payment gateways (like Razorpay/Instamojo).' },
                    { title: 'Cost Estimation', content: 'Approx ₹2,000 for domain/hosting or setting up an Etsy/Gumroad store.' },
                    { title: 'Marketing Basics', content: 'Use Pinterest! Pin your designs linking back to your store. Create TikToks/Reels showing how to use the templates.' }
                ]
            },
            'Online Tutoring & Coaching': {
                title: 'Online Tutoring & Coaching',
                intro: 'Teach students online through video calls in your area of expertise.',
                steps: [
                    { title: 'Idea Validation', content: 'Host a free 30-minute masterclass on Zoom to see if you can hold an audience’s attention and explain concepts clearly.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Subject expertise, patience, communication. Tools: Zoom/Google Meet, writing tablet (Pen tab), good mic.' },
                    { title: 'Legal & Registration Steps', content: 'None strictly required to start. Register on Udyam later. Register on platforms like UrbanPro.' },
                    { title: 'Cost Estimation', content: 'Approx ₹3,000 - ₹8,000 for a decent microphone and a digital pen tablet (like Wacom).' },
                    { title: 'Marketing Basics', content: 'Start a YouTube channel teaching small concepts. Direct viewers to book paid 1-on-1 sessions.' }
                ]
            },
            'Transcription & Data Entry': {
                title: 'Transcription & Data Entry',
                intro: 'Convert audio to text or handle basic data entry for online clients.',
                steps: [
                    { title: 'Idea Validation', content: 'Take a free typing speed test online. You need at least 40-50 WPM for data entry to be profitable.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Fast typing, high accuracy, listening skills. Tools: Good quality headphones, ergonomic keyboard.' },
                    { title: 'Legal & Registration Steps', content: 'Work as an independent contractor on platforms like Rev or Upwork. Keep track of earnings for Income Tax filing.' },
                    { title: 'Cost Estimation', content: 'Approx ₹1,500 for a comfortable keyboard and decent headphones.' },
                    { title: 'Marketing Basics', content: 'Create strong profiles on freelance platforms. Apply consistently to 5-10 jobs daily with tailored proposals.' }
                ]
            },

            // --- HANDICRAFTS & ARTS ---
            'Handmade Crafts & Etsy Shop': {
                title: 'Handmade Crafts & Etsy Shop',
                intro: 'Sell your custom crafts and artwork locally or on online marketplaces.',
                steps: [
                    { title: 'Idea Validation', content: 'Create a small batch of 5 items. Sell them at a local school fair or to friends to test pricing.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Crafting, basic product photography. Tools: Crafting materials, good lighting setup for photos.' },
                    { title: 'Legal & Registration Steps', content: 'GST Registration is mandatory for selling physical goods online in India (Amazon/Flipkart/Etsy).' },
                    { title: 'Cost Estimation', content: 'Approx ₹5,000 - ₹10,000 for raw materials, packaging boxes, and shipping tie-ups (like Shiprocket).' },
                    { title: 'Marketing Basics', content: 'Focus heavily on SEO for your Etsy/Amazon listings. Use Instagram to show the "behind the scenes" making process.' }
                ]
            },
            'Resin Art & Jewelry Making': {
                title: 'Resin Art & Jewelry Making',
                intro: 'Create trending custom jewelry, coasters, and keychains from home.',
                steps: [
                    { title: 'Idea Validation', content: 'Make 10 custom name keychains and see how fast they sell on your personal WhatsApp status.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Mixing ratios, color theory, safety protocols. Tools: Epoxy resin, silicone molds, pigments, safety mask, and gloves.' },
                    { title: 'Legal & Registration Steps', content: 'Udyam Registration. GST required if scaling to e-commerce platforms.' },
                    { title: 'Cost Estimation', content: 'Approx ₹4,000 - ₹8,000 for high-quality artist resin, molds, and safety gear.' },
                    { title: 'Marketing Basics', content: 'Resin pouring is highly visual. ASMR style Instagram Reels of the demolding process go viral very easily.' }
                ]
            },
            'Custom Portraits & Illustrations': {
                title: 'Custom Portraits & Illustrations',
                intro: 'Offer commissioned artwork or digital portraits for clients.',
                steps: [
                    { title: 'Idea Validation', content: 'Draw a portrait of a local influencer or celebrity, tag them on Instagram, and gauge the audience reaction.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Drawing, painting, or digital art. Tools: Quality paints/canvas OR an iPad/Drawing tablet with Procreate.' },
                    { title: 'Legal & Registration Steps', content: 'Operate as a freelancer. Ensure you watermark your digital proofs to avoid art theft before payment.' },
                    { title: 'Cost Estimation', content: 'Approx ₹2,000 for traditional art supplies. ₹30,000+ if investing in an iPad for digital art.' },
                    { title: 'Marketing Basics', content: 'Offer a special "Couple Portrait" discount during Valentine’s/Wedding season. Display art at local cafes.' }
                ]
            },
            'Eco-friendly Packaging & Bags': {
                title: 'Eco-friendly Packaging & Bags',
                intro: 'Produce sustainable, handmade packaging and paper bags for local shops.',
                steps: [
                    { title: 'Idea Validation', content: 'Make 50 high-quality paper bags and give them for free to a local boutique. See if they order more.' },
                    { title: 'Required Skills & Tools', content: 'Skills: Folding precision, bulk assembly. Tools: Craft paper rolls, strong adhesives, screen printing kit for logos.' },
                    { title: 'Legal & Registration Steps', content: 'Udyam (MSME) Registration. Trade license from the local municipality if operating at a commercial scale.' },
                    { title: 'Cost Estimation', content: 'Approx ₹5,000 - ₹12,000 for bulk wholesale craft paper, glue, and a manual creasing machine.' },
                    { title: 'Marketing Basics', content: 'Direct B2B sales. Walk into local clothing stores, bakeries, and pharmacies with your samples and pricing sheet.' }
                ]
            },

            // --- DEFAULT FALLBACK ---
            'Default': {
                title: 'Start Your Business',
                intro: 'A step-by-step guide to launching this business successfully in India.',
                steps: [
                    { title: 'Idea Validation', content: 'Talk to 10 potential customers in your local area to ensure they actually need this service.' },
                    { title: 'Required Skills & Tools', content: 'Ensure you have the foundational tools and knowledge required for this specific trade.' },
                    { title: 'Legal & Registration Steps', content: 'Register for an Udyam Aadhar (MSME) for government benefits. Check local municipal rules.' },
                    { title: 'Cost Estimation', content: 'Estimated ₹5,000 - ₹20,000 depending on the scale of your initial setup.' },
                    { title: 'Marketing Basics', content: 'Set up a Google My Business profile so locals can find you, and utilize WhatsApp Business.' }
                ]
            }
        };

        // 1. Get the Idea from the URL
        const urlParams = new URLSearchParams(window.location.search);
        let ideaKey = urlParams.get('idea'); 
        
        // 2. Load the matching data (or Default if missing)
        const data = roadmapsData[ideaKey] || roadmapsData['Default'];

        if (data) {
            // If we used the default fallback, update the title to match what they clicked
            const displayTitle = roadmapsData[ideaKey] ? data.title : `${ideaKey} Roadmap`;

            document.getElementById('roadmap-title').innerText = displayTitle;
            document.getElementById('roadmap-intro').innerText = data.intro;
            
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