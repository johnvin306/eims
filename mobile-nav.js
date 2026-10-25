const primaryNav = document.querySelector(".sidebar .nav-links");

if (primaryNav) {
    const mobileNav = document.createElement("nav");
    mobileNav.className = "mobile-bottom-nav";
    mobileNav.setAttribute("aria-label", "Mobile primary navigation");
    mobileNav.setAttribute("aria-hidden", "true");

    primaryNav.querySelectorAll("a").forEach((link) => {
        const mobileLink = link.cloneNode(true);
        mobileLink.removeAttribute("class");
        mobileLink.removeAttribute("aria-current");
        mobileLink.tabIndex = -1;

        if (link.classList.contains("active")) {
            mobileLink.classList.add("active");
            mobileLink.setAttribute("aria-current", "page");
        }

        mobileNav.append(mobileLink);
    });

    document.body.append(mobileNav);
    document.body.classList.add("has-mobile-bottom-nav");

    const mobileViewport = window.matchMedia("(max-width: 760px)");
    let scrollFrame = 0;

    function updateMobileNav() {
        scrollFrame = 0;
        const isVisible = mobileViewport.matches && window.scrollY > 120;

        mobileNav.classList.toggle("is-visible", isVisible);
        mobileNav.setAttribute("aria-hidden", String(!isVisible));
        document.body.classList.toggle("mobile-nav-visible", isVisible);
        mobileNav.querySelectorAll("a").forEach((link) => {
            link.tabIndex = isVisible ? 0 : -1;
        });
    }

    function scheduleMobileNavUpdate() {
        if (!scrollFrame) {
            scrollFrame = window.requestAnimationFrame(updateMobileNav);
        }
    }

    window.addEventListener("scroll", scheduleMobileNavUpdate, { passive: true });
    mobileViewport.addEventListener("change", scheduleMobileNavUpdate);
    updateMobileNav();
}
