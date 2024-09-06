var li = [
    {
        target : "header",
        src : "./assets/components/header.html"
    },
    {
        target : "footer",
        src : "./assets/components/footer.html"
    },
    {
        target : ".brand",
        src : "./assets/components/brand.html"
    }
    
];
document.addEventListener("DOMContentLoaded", () => {
    loadElements(li);
})

// relocate the cursor of each megamenu
window.addEventListener("resize", setMegaMenuArrowPosition);

// options for headers
window.onscroll = (e) => {
    if (window.scrollY >= 85) {
        document.querySelector("header").classList.add("header--scrolling");
    } else {
        document.querySelector("header").classList.remove("header--scrolling");
    }
}

window.addEventListener("resize", ()=>{
    
    if (window.innerWidth >= 991.98) {
        document.querySelectorAll(".navbar__item").forEach(
            (e)=>{e.classList.remove("navbar__item--show")}
        )
        document.querySelectorAll(".megamenu__submenu").forEach(
            (e)=>{e.classList.remove("megamenu__submenu--show")}
        )
        toggleNavigationBar(document.querySelector(".navbar__dropdown-close"), true);
    } else {
        
    }
})