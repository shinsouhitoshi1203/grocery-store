var li = [
    {
        target : "header",
        append : false,
        src : "./assets/components/header.html"
    },
    {
        target : "footer",
        append : false,
        src : "./assets/components/footer.html"
    },
    {
        target : ".brand",
        append : false,
        src : "./assets/components/brand.html"
    },
    // The following list is for objects that are supposed to be included later
    {
        target : ".brand",
        append : false,
        src : "./assets/components/brand.html"
    },
    
    
];

document.addEventListener("DOMContentLoaded", () => {
    if (true) {
        li = [
            ...li, {
                target : ".header__dashboard",
                append : true,
                src : "./assets/components/not-signed-in.html"
            }
        ]
    } else {
        li = [
            ...li, {
                target : ".header__dashboard",
                append : true,
                src : "./assets/components/signed-in.html"
            }
        ]
    }
    loadElements(li);
    loadGroup("product","","");
    loadGroup("tab-toggle","","");
    addEventGroup(document.querySelectorAll(".product__filter-button-wrapper"), "click", (o)=>{var a = `.${o.target.parentNode.getAttribute("data-from")}`;document.querySelector(a).classList.toggle("filter--show")})
    addEventGroup(document.querySelectorAll(".button__type-3"), "click", (o)=>{o.target.classList.toggle("button__type-3--selected")})
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

// toggle for responsive dropdown navigations
window.addEventListener("resize", ()=>{
    if (window.innerWidth >= breakpoint) {
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