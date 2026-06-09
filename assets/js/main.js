document.addEventListener("DOMContentLoaded", () => {


    const terminalBody = document.getElementById("terminal-body");
    const loaderOverlay = document.getElementById("terminal-loader");

    // Definition of the terminal sequence steps
    const sequence = [
        { type: 'input', text: 'cmd/> portfolio init' },
        { type: 'output', text: 'initializing saheer‘s portfolio...', delayAfter: 2000 },
        { type: 'success', text: '✔ Initialized successfully.', delayAfter: 1500 }
    ];

    let stepIndex = 0;

    function runSequence() {
        sessionStorage.setItem("portfolioAnimated", "true");
        if (stepIndex >= sequence.length) {
            // Sequence complete! Fade out the terminal overlay
            setTimeout(() => {
                loaderOverlay.classList.add("opacity-0", "pointer-events-none");
                // Optional: completely remove from DOM after CSS transition finishes
                setTimeout(() => loaderOverlay.remove(), 700);
            }, 500);
            return;
        }

        const currentStep = sequence[stepIndex];

        if (currentStep.type === 'input') {
            // Create the input element line with a flashing cursor
            const line = document.createElement("div");
            line.className = "flex items-center text-cyan-400";
            line.innerHTML = `<span></span><span class="animate-pulse ml-0.5 w-2 h-4 bg-cyan-400 inline-block align-middle"></span>`;
            terminalBody.appendChild(line);

            const textSpan = line.children[0];
            const cursorSpan = line.children[1];
            let charIndex = 0;

            // Character-by-character typewriter loop
            function typeChar() {
                if (charIndex < currentStep.text.length) {
                    textSpan.textContent += currentStep.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 60); // Speed of user typing keyboard simulations
                } else {
                    // Typing finished, remove blinking input cursor from this line and advance
                    cursorSpan.remove();
                    stepIndex++;
                    setTimeout(runSequence, 400);
                }
            }
            typeChar();

        } else {
            // For log and system output updates
            const line = document.createElement("div");

            if (currentStep.type === 'success') {
                line.className = "text-emerald-400 font-bold";
            } else {
                line.className = "text-blue-400/80 italic";
            }

            line.textContent = currentStep.text;
            terminalBody.appendChild(line);

            stepIndex++;
            setTimeout(runSequence, currentStep.delayAfter || 400);
        }
    }

    // Start the boot sequence layout execution
    if (sessionStorage.getItem("portfolioAnimated") !== "true") {
        runSequence();
    } else {
        loaderOverlay.classList.add('hidden');
    }

    // ==========================================
    // 1. HARDWARE SCROLL REVEAL (OBSERVER MECHANICS)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: "-60px 0px -10% 0px",
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Prevents flickering loops on upward track
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(section => {
        scrollObserver.observe(section);
    });

    // ==========================================
    // 2. PROJECT TAB CONTAINER ENGINE
    // ==========================================
    const btnCareer = document.getElementById("btn-career");
    const btnPersonal = document.getElementById("btn-personal");
    const tabCareer = document.getElementById("tab-content-career");
    const tabPersonal = document.getElementById("tab-content-personal");

    function switchTab(activeBtn, inactiveBtn, activeTab, inactiveTab) {
        // Handle Active Button Styles
        activeBtn.className = "tab-btn px-6 py-2.5 text-xs tracking-wider uppercase rounded-full transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold shadow-lg";
        inactiveBtn.className = "tab-btn px-6 py-2.5 text-xs tracking-wider uppercase rounded-full transition-all duration-300 text-blue-400/80 hover:text-white";

        // Handle Visibility Containers
        activeTab.classList.remove("hidden");
        inactiveTab.classList.add("hidden");
    }

    if (btnCareer && btnPersonal) {
        btnCareer.addEventListener("click", () => switchTab(btnCareer, btnPersonal, tabCareer, tabPersonal));
        btnPersonal.addEventListener("click", () => switchTab(btnPersonal, btnCareer, tabPersonal, tabCareer));
    }

    // ===================================================
    //       NATIVE WINDOW VANILLA MODAL DISPATCHER
    // ===================================================
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const modalBody = document.getElementById("modal-body-container");
    const modalMaxCard = document.getElementById("project-modal-card");

    // Micro Data Engine dictionary mapping specs directly
    const projectDatabase = {
        american: {
            title: 'The New American',
            type: 'API Developer | aTeam Soft Solutions',
            desc: 'Engineered tailored headless API layers feeding real-time digital news networks, integrated e-commerce transactional flows, and handled device app purchases.',
            tech: 'PHP, MySQL, WordPress RESTful API, JWT Auth',
            metric: 'Interactive Token Verification & Swagger Specs',
            icon: 'fas fa-newspaper text-cyan-400',
            bullets: [
                'Built custom optimized WordPress REST API endpoints to deliver dynamic, zero-latency news feed items directly to client mobile applications.',
                'Implemented a strict JSON Web Token (JWT) custom authentication layer to guarantee safe, stateless mobile user login endpoints.',
                'Developed complex API routing hooks handling e-commerce product catalogs, cart logic, and checkout workflows cleanly using in-built WooCommerce methods.',
                'Programmed custom back-end handlers processing secure in-app purchases and real-time subscriber account status loops.',
                'Integrated Swagger documentation tools into the engine pipeline to generate clean, self-mapping interactive specs for mobile engineering dependencies.'
            ]
        },
        aloha: {
            title: 'Aloha PMS',
            type: 'Full Stack Developer | aTeam Soft Solutions',
            desc: 'Telehealth platform enabling remote medical consultations between patients and healthcare providers.',
            tech: 'PHP, Laravel, MySQL, JQuery, Firebase',
            metric: '+50% Growth in User Registrations',
            icon: 'fas fa-cubes text-emerald-400',
            bullets: [
                'Developed a full-stack web application for end-to-end telehealth consultations.',
                'Developed a role-based access control system (Clinic Manager, Doctor, Patient) using Laravel’s authorization to secure platform modules and data.',
                'Implemented a real-time chat module by integrating Firebase Cloud Firestore for instant messaging between doctors and patients.',
                'Designed and developed core application modules, including user dashboards, appointment scheduling, patient records, and clinic management.',
                'Integrated Google OAuth and Facebook authentication using Laravel Socialite, enabling users to sign up and log in seamlessly and Improving user registrations by 50%'
            ]
        },
        easyadvo: {
            title: 'Easy Advo',
            type: 'Backend Developer | aTeam Soft Solutions',
            desc: 'An online platform for one-on-one video conferencing with lawyers. Designed case histories, multi-tenant schedules, and client alert streams.',
            tech: 'PHP, Laravel, Agora.io, Stripe, MySQL',
            metric: 'Automated Secure Client Video Routing Escrows',
            icon: 'fas fa-gavel text-purple-400',
            bullets: [
                'Developed the backend for an online legal consultation platform enabling secure one-on-one video calls between clients and lawyers.',
                'Engineered comprehensive REST APIs with robust authentication and a three-tier role-based system (Admin, Client, Lawyer), each with distinct permissions and data access.',
                'Integrated the Agora.io SDK to orchestrate real-time video sessions, implementing server-side token generation for secure user authorization and session management.',
                'Integrated Stripe payment gateway for processing consultation fees and implemented Stripe Connect to handle automated, secure payouts to lawyers’ connected accounts.'
            ]
        },
        tabsurfaces: {
            title: 'TAB Surfaces',
            type: 'Backend Developer | aTeam Soft Solutions',
            desc: 'B2B e-commerce platform for TAB Surfaces, enabling customers to browse and order flooring solutions via web interfaces.',
            tech: 'PHP, Laravel, MySQL, RESTful API',
            metric: '40% Backend Query Acceleration',
            icon: 'fas fa-layer-group text-blue-400',
            bullets: [
                'Served as Backend Developer for a B2B/B2C flooring solutions platform, building the core API infrastructure.',
                'Designed a secure REST API serving both web and mobile clients, featuring role-based access control for Admin and Customer users.',
                'Developed functionality to sync customer and product data with SAP via its APIs, ensuring data consistency.',
                'Enhanced API response times by 40% for product search queries through indexing and query optimization, handling large data efficiently.'
            ]
        },
        ride550: {
            title: 'Ride-550',
            type: 'Full Stack Developer | aTeam Soft Solutions',
            desc: 'Ride booking platform supporting both on-demand and pre-scheduled bookings for users.',
            tech: 'PHP, Laravel, Node.js, Socket.io, JQuery, MySQL',
            metric: 'Sub-Second Driver Tracking Interceptors',
            icon: 'fas fa-taxi text-indigo-400',
            bullets: [
                'Engineered a comprehensive admin dashboard from scratch using Laravel Blade and jQuery, enabling management of users, drivers, rides, and platform analytics.',
                'Developed a complete suite of secure RESTful APIs for efficient communication to the mobile application, handling core functionalities like user authentication, ride booking, and trip history.',
                'Integrated Firebase Cloud Messaging (FCM) to implement push notifications, keeping users and drivers informed on ride requests, status updates, and alerts.',
                'Implemented a real-time driver discovery system using Node.js and Socket.io, enabling riders to instantly view and request rides from nearby available drivers.'
            ]
        },
        yakeety: {
            title: 'Yakeety',
            type: 'Full Stack Developer | aTeam Soft Solutions',
            desc: 'A robust web application driving live interactive quiz games through a multi-tier administration panel and robust REST services.',
            tech: 'PHP, Laravel, MySQL, JQuery, RESTful API',
            metric: 'Three-Tier Architecture (Super, Team, Player)',
            icon: 'fas fa-gamepad text-blue-400',
            bullets: [
                'Architected high-availability REST APIs handling sub-second data verification loops for competitive quiz modules.',
                'Assembled a granular three-tier workflow separating Super Admin structural access, Team Admin parameters, and end-user Player instances cleanly.',
                'Developed a dynamic questionnaire builder allowing Super Admins to orchestrate intricate query behaviors and game layouts.',
                'Coded an automated reporting matrix enabling Team Admins to run clean analytical evaluations on live game event performances.',
                'Engineered on-the-fly QR code generation mechanics to instantly deploy fast-access entry routes for active match environments.'
            ]
        },
        audit: {
            title: 'Audit Tracker',
            type: 'Full-Stack Developer | Excelledia Ventures',
            desc: 'Enterprise web framework built to organize regulatory compliance audits and handle protected enterprise verification documents.',
            tech: 'Laravel, AngularJS, MySQL, AWS S3',
            metric: 'Isolated Multi-Tenant Workflow Maps',
            icon: 'fas fa-shield-check text-indigo-400',
            bullets: [
                'Managed dual-sided product development loops, engineering back-end Laravel logic alongside crisp front-end AngularJS views.',
                'Engineered a highly specialized Single-Auditor workspace module allowing professionals to seamlessly initialize, log, and sign off distinct corporate audit files.',
                'Integrated cloud object pipelines using AWS S3 SDK hooks to handle highly confidential document attachments safely.'
            ]
        },
        echit: {
            title: 'E-chit',
            type: 'Full Stack Developer | Datastone Solutions (2019 - 2020)',
            desc: 'A robust financial tracking system allowing centralized administrations to govern active chitty accounts and record field collection points.',
            tech: 'PHP, Laravel, MySQL, RESTful API, JQuery',
            metric: 'Real-Time Field Collection Ledger Systems',
            icon: 'fas fa-wallet text-purple-400',
            bullets: [
                'Took complete project ownership from conceptual backend database design blueprints to active live server infrastructure deployment.',
                'Mapped a dual-module processing loop organizing high-level Central Admin functions and mobile Collection Agent networks.',
                'Engineered lightweight, stateless REST APIs facilitating data submissions from field agent mobile apps directly to primary records.',
                'Coded automated processing routines aggregating incoming cash variables into interactive administrative asset summaries and analytics charts.'
            ]
        },
        nexus: {
            title: 'Nexus Identity',
            type: 'SSO Microservice Architecture | Open-Source Tool',
            desc: 'A production-grade, headless OAuth2 authorization microservice optimized for high-throughput single sign-on deployments.',
            tech: 'Node.js, Express, Redis Cluster, Docker, Jest',
            metric: 'Introspection Latency Measured Under 2ms',
            icon: 'fas fa-shield-halved text-cyan-400',
            bullets: [
                'Architected an open-source, microservice token service tracking cryptographic data signatures securely.',
                'Configured dedicated horizontal data layer extensions by running Redis cluster instances to handle session introspection loops.',
                'Assembled automated isolated execution profiles using Docker containers to assure clean deployments across hosting servers.'
            ]
        }
    };

    function openModal(projectId) {
        const data = projectDatabase[projectId];
        if (!data || !modal || !modalBody || !modalMaxCard) return;

        // Render clean structural layouts inside dynamic frame container
        modalBody.innerHTML = `
        <h3 class="text-2xl font-bold text-white mb-1">${data.title}</h3>
        <p class="text-xs font-mono text-cyan-400 mb-4">${data.type}</p>
        <p class="text-sm text-blue-200/80 mb-6 font-light">${data.desc}</p>
        <div class="mb-6">
            <h4 class="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2">Engine Tech Stack</h4>
            <p class="text-xs font-mono text-blue-300 bg-blue-950/30 border border-blue-900/50 p-3 rounded-xl">${data.tech}</p>
        </div>
        <div>
            <h4 class="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2">Key Architectural Contributions</h4>
            <ul class="space-y-2.5 text-xs text-blue-200/70 font-light">
                ${data.bullets.map(b => `<li class="flex items-start gap-2"><span class="text-cyan-400 mt-0.5">▪</span><span>${b}</span></li>`).join('')}
            </ul>
        </div>
    `;

        // Reset scroll offset inside modal container card to top on entry
        modalMaxCard.scrollTop = 0;

        // 1. Unhide block container first to activate native flex rendering calculations
        modal.classList.remove("hidden");

        // 2. DISABLE BACKGROUND SCROLLING
        document.body.classList.add("overflow-hidden");

        // 3. Schedule window animation sequence inside browser execution queue frame
        requestAnimationFrame(() => {
            setTimeout(() => {
                modal.classList.remove("opacity-0", "pointer-events-none");
                modal.classList.add("opacity-100");

                modalMaxCard.classList.remove("scale-95");
                modalMaxCard.classList.add("scale-100");
            }, 20);
        });
    }

    function closeModal() {
        if (!modal || !modalMaxCard) return;

        // Cleanly execute entry scaling step transitions downward
        modal.classList.remove("opacity-100");
        modal.classList.add("opacity-0", "pointer-events-none");

        modalMaxCard.classList.remove("scale-100");
        modalMaxCard.classList.add("scale-95");

        // 1. RE-ENABLE BACKGROUND SCROLLING
        document.body.classList.remove("overflow-hidden");

        // Re-apply layout hidden class rule exactly after the 300ms transition finishes
        setTimeout(() => {
            modal.classList.add("hidden");
            if (modalBody) modalBody.innerHTML = "";
        }, 300);
    }

    // Attach click triggers via micro dataset attributes
    document.body.addEventListener("click", (e) => {
        const targetBtn = e.target.closest(".metrics-btn");
        if (targetBtn) {
            const projectId = targetBtn.getAttribute("data-project");
            openModal(projectId);
        }
    });

    // Bind Modal Triggers & Keyboard Event Loops
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

    // Catch clicks hitting the background backdrop layer or outside the container target
    if (modal) {
        modal.addEventListener("click", (e) => {
            const modalBackdropClose = document.getElementById("modal-backdrop-close");
            if (e.target === modal || e.target === modalBackdropClose) {
                closeModal();
            }
        });
    }

    // Global safety net: Close active views instantly on hardware escape key triggers
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
});
// Append these explicit entries to your `projectDatabase` dictionary mapping configurations inside your main script block:


// ===================================================
//  VANILLA JS ECOSYSTEM TAB ROUTER ENGINE
// ===================================================
const expNavButtons = document.querySelectorAll(".exp-nav-btn");
const expContentPanels = document.querySelectorAll(".exp-content-panel");

expNavButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const targetToken = btn.getAttribute("data-target");

        // 1. Reset all button elements styling classes back to old states
        expNavButtons.forEach(b => {
            b.className = "exp-nav-btn w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group border-transparent hover:bg-blue-950/20";

            // Sub-elements text reset
            const companyId = b.getAttribute("data-target");
            document.getElementById(`exp-title-${companyId}`).className = "font-bold text-sm tracking-wide text-white";

            const arrowIcon = document.getElementById(`exp-arrow-${companyId}`);
            arrowIcon.className = "fas fa-chevron-right text-xs text-blue-900 transition-transform";
        });

        // 2. Set conditional active layouts based on design properties
        if (targetToken === "ateam") {
            btn.className = "exp-nav-btn w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border-cyan-500/50";
            document.getElementById("exp-title-ateam").className = "font-bold text-sm tracking-wide text-cyan-400";
            document.getElementById("exp-arrow-ateam").className = "fas fa-chevron-right text-xs text-cyan-400 translate-x-1 transition-transform";
        } else if (targetToken === "excelledia") {
            btn.className = "exp-nav-btn w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group bg-gradient-to-r from-blue-950/60 to-indigo-950/40 border-blue-500/50";
            document.getElementById("exp-title-excelledia").className = "font-bold text-sm tracking-wide text-blue-400";
            document.getElementById("exp-arrow-excelledia").className = "fas fa-chevron-right text-xs text-blue-400 translate-x-1 transition-transform";
        } else if (targetToken === "datastone") {
            btn.className = "exp-nav-btn w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group bg-gradient-to-r from-blue-950/60 to-purple-950/40 border-indigo-500/50";
            document.getElementById("exp-title-datastone").className = "font-bold text-sm tracking-wide text-indigo-400";
            document.getElementById("exp-arrow-datastone").className = "fas fa-chevron-right text-xs text-indigo-400 translate-x-1 transition-transform";
        }

        // 3. Update viewports visibility
        expContentPanels.forEach(panel => {
            if (panel.id === `exp-panel-${targetToken}`) {
                panel.classList.remove("hidden");
                setTimeout(() => {
                    panel.className = "exp-content-panel grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 opacity-100 scale-100";
                }, 20);
            } else {
                panel.className = "exp-content-panel grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 opacity-0 scale-95 hidden";
            }
        });
    });
});


// ===================================================
//  VANILLA JS NATIVE HERO TYPING ANIMATION ENGINE
// ===================================================
const typingTarget = document.getElementById("typing-text");

if (typingTarget) {
    const roles = ['PHP Laravel Architect.', 'Node.js Developer.', 'Full-Stack Developer.'];
    let currentRoleIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentFullText = roles[currentRoleIndex];

        if (isDeleting) {
            currentText = currentFullText.substring(0, currentText.length - 1);
            typeSpeed = 40;
        } else {
            currentText = currentFullText.substring(0, currentText.length + 1);
            typeSpeed = 100;
        }

        // Output current character string frame directly to node text
        typingTarget.textContent = currentText;

        if (!isDeleting && currentText === currentFullText) {
            typeSpeed = 1800; // Complete phrase wait delay frame
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 400; // Next string layout rotation interval step
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Trigger execution
    typeEffect();
}

const copyrightElement = document.querySelector(".copyright-year");
if (copyrightElement) {
    copyrightElement.textContent = new Date().getFullYear();
}
