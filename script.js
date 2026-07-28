const launchSolutions = {
  business: {
    chip: "Service business / startup",
    title: "Business Launch",
    eyebrow: "For startups, SMEs, and service businesses",
    description: "Everything needed to show up with confidence from your first customer conversation.",
    points: ["Brand identity", "Business-ready assets", "Digital handover"],
    planPrefix: "Business Launch"
  },
  local: {
    chip: "Local business",
    title: "Local Business Launch",
    eyebrow: "For shops, clinics, restaurants, and salons",
    description: "A credible, customer-ready foundation for businesses that win trust close to home.",
    points: ["Professional presence", "Reusable customer assets", "Clear handover"],
    planPrefix: "Local Business Launch"
  },
  ecommerce: {
    chip: "E-commerce brand",
    title: "E-commerce Launch",
    eyebrow: "For online stores and D2C brands",
    description: "A brand and digital foundation designed for a store that needs to look ready to sell.",
    points: ["Store-ready brand system", "Customer-facing assets", "Digital source files"],
    planPrefix: "E-commerce Launch"
  },
  creator: {
    chip: "Creator",
    title: "Creator Launch",
    eyebrow: "For creators, YouTubers, and influencers",
    description: "Build the visual system and reusable assets that make your work recognisably yours.",
    points: ["Signature brand system", "Channel-ready assets", "Editable templates"],
    planPrefix: "Creator Launch"
  },
  personal: {
    chip: "Personal brand",
    title: "Personal Brand Launch",
    eyebrow: "For coaches, consultants, and speakers",
    description: "A professional presence that makes your expertise easier to recognise and remember.",
    points: ["Authority-led identity", "Business collateral", "Documented handover"],
    planPrefix: "Personal Brand Launch"
  },
  corporate: {
    chip: "Corporate rebrand",
    title: "Corporate Rebranding",
    eyebrow: "For established businesses",
    description: "Bring a scattered business presence into one clear, consistent, professional system.",
    points: ["Refined identity", "Consistent collateral", "Brand documentation"],
    planPrefix: "Corporate Rebranding"
  },
  website: {
    chip: "Website & apps",
    title: "Website & App Development",
    eyebrow: "For businesses needing a website or app",
    description: "Build the digital foundation, documented files, and handover needed for the next version of your business.",
    points: ["Digital foundation", "Source files & backup", "Training at higher tiers"],
    planPrefix: "Website & App Development"
  },
  automation: {
    chip: "AI automation",
    title: "AI Automation Setup",
    eyebrow: "For businesses ready to automate",
    description: "Move toward clearer systems with project documentation, handover, and growth-ready guidance.",
    points: ["Clearer workflows", "Documented setup", "System guidance"],
    planPrefix: "AI Automation Setup"
  }
};

const planDefinitions = [
  {
    tier: "Foundation",
    price: "₹5,999",
    timeline: "7–10 days",
    revisions: "2 revisions",
    description: "Get credible and launch-ready with the core brand, business, and digital handover assets.",
    features: [
      "Logo suite, favicon, palette, typography & brand guidelines",
      "Business card, letterhead, email signature, profile & cover assets",
      "Canva editable templates and PNG export templates",
      "Website source files, backup, assets, sitemap & robots.txt",
      "Project handover, user manual & credentials where managed"
    ]
  },
  {
    tier: "Professional",
    price: "₹11,999",
    timeline: "10–14 days",
    revisions: "4 revisions",
    featured: true,
    description: "A more complete launch setup for businesses that need presentation, measurement, and training built in.",
    features: [
      "Everything in Foundation",
      "Editable AI and PSD source files",
      "Company profile and brochure",
      "Analytics setup report and SEO report",
      "Training recording for a smoother handover"
    ]
  },
  {
    tier: "Scale",
    price: "₹21,999",
    timeline: "14–21 days",
    revisions: "Unlimited revisions",
    description: "Build a more documented, growth-ready foundation with systems and maintenance guidance included.",
    features: [
      "Everything in Professional",
      "Database backup and CRM documentation",
      "Automation guide and SOP document",
      "Brand asset library",
      "Maintenance guide for what comes next"
    ]
  }
];

const comparisonRows = [
  ["Core brand system & business assets", "Included", "Included", "Included"],
  ["Canva templates, asset files & project handover", "Included", "Included", "Included"],
  ["Editable AI / PSD source files", "—", "Included", "Included"],
  ["Company profile & brochure", "—", "Included", "Included"],
  ["Analytics, SEO report & training recording", "—", "Included", "Included"],
  ["Database backup & CRM documentation", "—", "—", "Included"],
  ["Automation guide, SOP & asset library", "—", "—", "Included"],
  ["Revisions / delivery", "2 · 7–10 days", "4 · 10–14 days", "Unlimited · 14–21 days"]
];

const growthBundles = [
  ["Local Business Growth Bundle", "₹14,999", "For local businesses that need a consistent monthly growth rhythm.", "local"],
  ["Creator Growth Bundle", "₹14,999", "For creators building a more consistent content and reporting routine.", "creator"],
  ["Business Growth Bundle", "₹19,999", "For SMEs that want one integrated monthly growth partnership.", "business"],
  ["Personal Brand Growth Bundle", "₹19,999", "For professionals building visibility around their expertise.", "personal"],
  ["E-commerce Growth Bundle", "₹24,999", "For e-commerce brands ready for a more complete monthly growth system.", "ecommerce"]
];

const services = [
  { name: "Social Media Management", price: "₹9,999", group: "Visibility" },
  { name: "SEO", price: "₹9,999", group: "Visibility" },
  { name: "Google Business Management", price: "₹2,999", group: "Visibility" },
  { name: "Content Writing", price: "₹4,999", group: "Visibility" },
  { name: "Graphic Design", price: "₹5,999", group: "Creative production" },
  { name: "Reel Editing", price: "₹6,999", group: "Creative production" },
  { name: "Video Editing", price: "₹9,999", group: "Creative production" },
  { name: "Email Marketing", price: "₹4,999", group: "Retention" },
  { name: "WhatsApp Marketing", price: "₹3,999", group: "Retention" },
  { name: "Website Care", price: "₹2,999", group: "Technical continuity" },
  { name: "Development Support", price: "₹4,999", group: "Technical continuity" },
  { name: "AI Automation Care", price: "₹7,999", group: "Technical continuity" }
];

let selectedSolutionKey = "business";
let selectedServiceGroup = "All";

const byId = (id) => document.getElementById(id);

function buildSectors() {
  const picker = byId("sectorPicker");
  picker.innerHTML = Object.entries(launchSolutions).map(([key, solution]) =>
    `<button class="sector-chip ${key === selectedSolutionKey ? "active" : ""}" role="tab" aria-selected="${key === selectedSolutionKey}" type="button" data-solution="${key}">${solution.chip}</button>`
  ).join("");

  picker.querySelectorAll("[data-solution]").forEach(button => {
    button.addEventListener("click", () => selectSolution(button.dataset.solution, true));
  });
}

function buildPlans() {
  const solution = launchSolutions[selectedSolutionKey];
  byId("selectedEyebrow").textContent = solution.eyebrow;
  byId("selectedTitle").textContent = solution.title;
  byId("selectedDescription").textContent = solution.description;
  byId("selectedPrice").textContent = planDefinitions[0].price;
  byId("solutionPoints").innerHTML = solution.points.map(point => `<span>${point}</span>`).join("");
  byId("plansHeading").textContent = `${solution.title} plans`;
  byId("plansIntro").textContent = `Pick the level of readiness you need for your ${solution.title.toLowerCase()}. Every plan includes a defined handover, so you always know what comes next.`;

  byId("planGrid").innerHTML = planDefinitions.map((plan, index) => `
    <article class="plan-card ${plan.featured ? "featured" : ""}">
      <span class="tier-number">0${index + 1} / ${plan.tier}</span>
      <h3>${plan.tier}</h3>
      <p class="plan-description">${plan.description}</p>
      <div class="price-block"><strong>${plan.price}</strong><small>One-time introductory launch price</small></div>
      <div class="plan-meta"><span><i></i>${plan.timeline}</span><span><i></i>${plan.revisions}</span></div>
      <span class="inclusion-label">What it brings together</span>
      <ul class="plan-features">${plan.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
      <button class="button" type="button" data-plan="${solution.planPrefix} — ${plan.tier}">${plan.featured ? "Start with Professional" : `Choose ${plan.tier}`} <span aria-hidden="true">→</span></button>
    </article>
  `).join("");

  byId("comparisonBody").innerHTML = comparisonRows.map(row =>
    `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`
  ).join("");

  byId("planGrid").querySelectorAll("[data-plan]").forEach(button => {
    button.addEventListener("click", () => selectPlan(button.dataset.plan));
  });
}

function selectSolution(key, shouldScroll) {
  selectedSolutionKey = key;
  buildSectors();
  buildPlans();
  if (shouldScroll) byId("plans").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectPlan(plan) {
  const formPlan = byId("formPlan");
  formPlan.value = plan;
  byId("formContext").textContent = plan;
  byId("formService").value = "Launch or rebrand";
  byId("request").scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupIntentRouter() {
  const output = byId("intentOutput");
  const messages = {
    launch: `Choose your business type below and see its three launch plans. <a href="#launch">Explore launch paths →</a>`,
    growth: `Choose one integrated monthly bundle first, then add a focused service only if you need it. <a href="#growth">See growth bundles →</a>`,
    systems: `Start with the Website & App or AI Automation route, then choose the level of documentation and handover you need. <a href="#launch">See system routes →</a>`
  };
  function setIntent(intent) {
    output.innerHTML = messages[intent];
    document.querySelectorAll(".intent-card").forEach(card => card.classList.toggle("active", card.dataset.intent === intent));
  }
  function scrollToIntent(intent) {
    const target = document.querySelector(`.intent-card[data-intent="${intent}"]`)?.dataset.target;
    const section = target ? document.querySelector(target) : null;
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  setIntent("launch");
  document.querySelectorAll(".intent-card").forEach(card => card.addEventListener("click", () => {
    setIntent(card.dataset.intent);
    scrollToIntent(card.dataset.intent);
  }));
}

function buildGrowth() {
  byId("growthGrid").innerHTML = growthBundles.map(([name, price, description, key]) => `
    <article class="growth-card">
      <span class="tier-number">MONTHLY / ${launchSolutions[key].chip}</span>
      <h3>${name}</h3>
      <p>${description}</p>
      <strong>${price}</strong><small>starting monthly</small>
      <a href="#request" data-growth="${name}">Discuss this bundle →</a>
    </article>
  `).join("");
  byId("growthGrid").querySelectorAll("[data-growth]").forEach(link => {
    link.addEventListener("click", () => {
      byId("formPlan").value = link.dataset.growth;
      byId("formContext").textContent = link.dataset.growth;
      byId("formService").value = "Monthly growth";
    });
  });
}

function buildServices() {
  const groups = ["All", ...new Set(services.map(service => service.group))];
  byId("serviceFilters").innerHTML = groups.map(group =>
    `<button type="button" class="filter-button ${group === selectedServiceGroup ? "active" : ""}" data-group="${group}">${group}</button>`
  ).join("");
  byId("serviceFilters").querySelectorAll("[data-group]").forEach(button => {
    button.addEventListener("click", () => {
      selectedServiceGroup = button.dataset.group;
      buildServices();
    });
  });
  const visibleServices = selectedServiceGroup === "All" ? services : services.filter(service => service.group === selectedServiceGroup);
  byId("serviceGrid").innerHTML = visibleServices.map(service => `
    <article class="service-card">
      <span class="service-group">${service.group}</span>
      <h3>${service.name}</h3>
      <p>Ongoing support with monthly reporting, final assets, editable files where applicable, and project handover notes.</p>
      <footer><div><strong>${service.price}</strong><br /><small>starting monthly</small></div><a href="#request" data-service="${service.name}">Request →</a></footer>
    </article>
  `).join("");
  byId("serviceGrid").querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => {
      byId("formPlan").value = link.dataset.service;
      byId("formContext").textContent = link.dataset.service;
      byId("formService").value = "A specific service";
    });
  });
}

function setupMenu() {
  const toggle = byId("menuToggle");
  const nav = byId("navLinks");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
  window.addEventListener("scroll", () => byId("siteHeader").classList.toggle("scrolled", window.scrollY > 14), { passive: true });
}

function setupComparison() {
  const button = byId("compareButton");
  const comparison = byId("comparison");
  button.addEventListener("click", () => {
    const opening = comparison.hidden;
    comparison.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
    if (opening) comparison.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function setupForm() {
  const form = byId("requestForm");
  const status = byId("formStatus");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type=submit]");
    const formData = new FormData(form);
    const accessKey = formData.get("access_key");
    button.disabled = true;
    button.innerHTML = "Sending request…";
    status.textContent = "";
    status.className = "form-status";
    if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      const message = `Hi Qurious Tech, my name is ${formData.get("name")}. I am interested in: ${formData.get("selected_plan") || formData.get("service")}. Business: ${formData.get("business")}. Details: ${formData.get("message") || "Not provided"}`;
      window.open(`https://wa.me/918827327100?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      status.textContent = "WhatsApp has opened with your request ready to send.";
      status.classList.add("success");
      button.innerHTML = "Request ready on WhatsApp →";
      button.disabled = false;
      return;
    }
    try {
      const response = await fetch(form.action, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      status.textContent = "Request sent. We will be in touch soon.";
      status.classList.add("success");
      button.innerHTML = "Request sent ✓";
    } catch {
      status.textContent = "Could not send online. Please use WhatsApp or call us instead.";
      status.classList.add("error");
      button.innerHTML = "Try again";
      button.disabled = false;
    }
  });
}

function setupReveals() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".section, .hero-panel").forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
  document.querySelector(".hero")?.classList.add("visible");
}

buildSectors();
buildPlans();
buildGrowth();
buildServices();
setupIntentRouter();
setupMenu();
setupComparison();
setupForm();
setupReveals();
