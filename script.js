// Ordered list of sections.
const sections = [
    {
        containerId: `landing-section`,
        url: `/`,
        title: `MXT`,
        containerEl: null,
        menuItemId: `menu-landing`,
        menuItemEl: null,
    },
    {
        containerId: `works-section`,
        url: `/works`,
        title: `Works — MXT`,
        containerEl: null,
        menuItemId: `menu-works`,
        menuItemEl: null,
    },
    {
        containerId: `studio-section`,
        url: `/studio`,
        title: `Studio — MXT`,
        containerEl: null,
        menuItemId: `menu-studio`,
        menuItemEl: null,
    },
    {
        containerId: `contacts-section`,
        url: `/contacts`,
        title: `Contacts — MXT`,
        containerEl: null,
        menuItemId: `menu-contacts`,
        menuItemEl: null,
    },
];

const worksSections = [
    {
        containerId: `w-stonehenge`,
        menuItemId: `w-menu-stonehenge`,
        containerEl: null,
        menuItemEl: null
    },
    {
        containerId: `w-driving-sim`,
        menuItemId: `w-menu-driving-sim`,
        containerEl: null,
        menuItemEl: null
    },
    {
        containerId: `w-hello`,
        menuItemId: `w-menu-hello`,
        containerEl: null,
        menuItemEl: null
    },
];

const sectionsObserver = new IntersectionObserver(
    entries => {      
        // Find the current section.
        for (var i = sections.length - 1; i >= 0; i--) {
            if (sections[i].containerEl.getBoundingClientRect().top <= 0) {
                // This is the current URL.
                // If it's different from the current URL.
                if (document.location.pathname != sections[i].url) {
                    window.history.pushState(``, ``, sections[i].url);
                    initOrUpdateCurrentSection();
                }

                break;
            }
        }
    },
    {
        threshold: [0, 1]
    });

const worksSectionsObserver = new IntersectionObserver(
    entries => {
        initOrUpdateCurrentWorksSection();
    },
    {
        threshold: [0, 1]
    }
)

window.addEventListener(`load`, () => {
    // Cache elements.
    for (var i = 0; i < sections.length; i++) {
        sections[i].containerEl = document.getElementById(sections[i].containerId);
        sections[i].menuItemEl = document.getElementById(sections[i].menuItemId);
    }
    for (var i = 0; i < worksSections.length; i++) {
        worksSections[i].containerEl = document.getElementById(worksSections[i].containerId);
        worksSections[i].menuItemEl = document.getElementById(worksSections[i].menuItemId);
    }

    // Handle URL.
    var urlIsValid = false;
    for (var i = 0; i < sections.length; i++) {
        if (document.location.pathname == sections[i].url) {
            urlIsValid = true;
            window.scrollTo(0, sections[i].containerEl.getBoundingClientRect().top);
            break;
        }
    }
    if (!urlIsValid) {
        history.replaceState(``, ``, `/`);
    }

    // Add elements to check for visibility in the viewport.
    for (var i = 0; i < sections.length; i++) {
        sectionsObserver.observe(sections[i].containerEl);
    }
    for (var i = 0; i < worksSections.length; i++) {
        worksSectionsObserver.observe(worksSections[i].containerEl);
    }
});

function initOrUpdateCurrentSection() {
    for (var i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (document.location.pathname == section.url) {
            section.menuItemEl.classList.add(`current`);
            document.title = section.title;
        }
        else {
            section.menuItemEl.classList.remove(`current`);
        }
    }
}

function initOrUpdateCurrentWorksSection() {
    for (var i = 0; i < worksSections.length; i++) {
        const worksSection = worksSections[i];
        const boundingRect = worksSection.containerEl.getBoundingClientRect();
        const isCurrent = boundingRect.top <= 0 && boundingRect.bottom > 0;
        if (isCurrent) {
            worksSection.menuItemEl.classList.add(`current`);
        }
        else {
            worksSection.menuItemEl.classList.remove(`current`);
        }
    }
}