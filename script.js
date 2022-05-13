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

window.addEventListener(`load`, () => {
    // Cache elements.
    for (var i = 0; i < sections.length; i++) {
        sections[i].containerEl = document.getElementById(sections[i].containerId);
        sections[i].menuItemEl = document.getElementById(sections[i].menuItemId);
    }

    document.onscroll = () => onScrollOrResize(sections);
    window.onresize = () => onScrollOrResize(sections);

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

    initOrUpdateCurrentSection();
});

function onScrollOrResize(sections) {
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
}

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