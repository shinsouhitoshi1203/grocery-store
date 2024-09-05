// Load components
async function loadElements(list) {
    var arr = [], inner=[];
    async function getData(t,s) {
        var httpResult = await fetch(s);
        var rawResult = await httpResult.text();
        arr.push(rawResult);
    }
    
    list.forEach((obj)=>{
        var t = obj.target;
        var s = obj.src;
        arr.push (
            new Promise (
                function(resolve) {
                    fetch(s).then((h)=>h.text()).then((r)=>{
                        resolve({
                            target: t,
                            html: r,
                        }); 
                    })
                }
            )
        )
         
    });
    function dataHandler(target,raw) {
        var o = document.querySelector(target);
        localStorage.setItem(target, raw);
        console.log(o)
        if (!o.innerHTML) o.innerHTML = raw;
    }
    Promise.all(arr).then((a)=>{
        a.forEach(o=>{
            dataHandler(o.target, o.html)
        })
    })
}

function setMegaMenuArrowPosition() {
    function handler() {
        var nav__list = document.querySelectorAll(".navbar__item");
        var arrows = document.querySelectorAll(".megamenu");
        var position = new Array(nav__list.length).fill(0);

        nav__list.forEach((nav__item,i)=>{
            var value = nav__item.offsetLeft + nav__item.offsetWidth / 2 - 16;
            position[i] = `${value}px`;
        })
        
        arrows.forEach((arrow,i)=>{
            arrow.style.setProperty("--arrow-position",position[i]);
        })
    }
    var promise = new Promise (
        function (resolve) {
            setTimeout(()=>{resolve()},300)
        }
    );
    promise.then(()=>{
        handler();
    })
}


var input = {
title: "Computers",shape: "./icons/shapes/triangle.svg",
icon: "./icons/categories/pc.svg",
list: [
"Shop All Computers",
"Laptops",
"PC Gaming",
"Monitors",
"Chromebook",
"Printers & Ink",
"Shop all TVs",
"Computer Accessories",
"Desktops",
"Tax Software",
"Computer Software",
"PC Finder",
]
}

function loadCategory(group) {
    var li = group.list.map(o=>`<li><a href="#!" title="Shop all TVs">${o}</a></li>`).join("");
    var html = `<div class="megamenu__item">
    <div class="megamenu__icon">
    <img src="${group.shape}" alt="" class="megamenu__icon-shape">
    <img src="${group.icon}" alt="" class="megamenu__icon-real"></div>
    </div>
    <div class="megamenu__meta">
    <p class="megamenu__meta-title">${group.title}</p>
    <ul class="megamenu__meta-list">${li}</div>
    </div>
    `;
    return html;
}
// no more propagandation


function categoryShow(e, v) {
    try {
        var allCategoriesLink = document.querySelectorAll(".megamenu__meta-item");
        allCategoriesLink.forEach(c=>{c.classList.remove("megamenu__meta-item--hover")})
        e.classList.add("megamenu__meta-item--hover");
        
        document.querySelector(".megamenu__contents").innerText = "";
        var allCategories = document.querySelectorAll(".megamenu__submenu");
        var o = e.querySelector(".megamenu__submenu");
        allCategories.forEach(c=>{c.classList.remove("megamenu__submenu--appeared")})
        o.classList.add("megamenu__submenu--appeared");

    } catch (error) {
        document.querySelector(".megamenu__contents").innerText = "";
    }
    v.stopPropagation();
}

// toggle navigation bar
function toggleNavigationBar(b) {
    //var o = document.querySelector(".navbar__overlay");
    var t = document.querySelector(b.getAttribute("target-item"));
    if (t.classList.contains("navbar--hide")) {
        t.classList.remove("navbar--hide");
        t.classList.add("navbar--show");
    } else {
        t.classList.remove("navbar--show");
        t.classList.add("navbar--hide");
    }
}

// toggle megamenu by javascript
function toggleMegamenu (e) {
    function handler(t) {
        t.classList.toggle("navbar__item--show");
    }
    if (window.innerWidth < 991.98) {
        handler(e);
    }
}
function toggleMegamenuOff (e) {
    setMegaMenuArrowPosition();
    if (window.innerWidth >= 991.98) {
        e.classList.remove("navbar__item--show");
    }
}
function toggleMegamenuOn (e) {
    setMegaMenuArrowPosition();
    if (window.innerWidth >= 991.98) {
        e.classList.add("navbar__item--show");
    }
}
// toggle submenu
function toggleSubMegamenu (e) {
    if (window.innerWidth) {
        try {e.parentNode.querySelector(".megamenu__submenu").classList.toggle("megamenu__submenu--show");}  catch (error) {}
    }
}
function toggleSubMegamenuOff (e) {
    setMegaMenuArrowPosition();
    if (window.innerWidth >= 991.98) {
        try {e.parentNode.querySelector(".megamenu__submenu").classList.remove("megamenu__submenu--show");} catch (error) {}
    }
}
function toggleSubMegamenuOn (e) {
    setMegaMenuArrowPosition();
    if (window.innerWidth >= 991.98) {
        try {e.parentNode.querySelector(".megamenu__submenu").classList.add("megamenu__submenu--show");} catch (error) {}
    }
}
// toggle items in mixed megamenu
function categoryShowToggle(t, e) {
    // console.log([t]);
    e.stopPropagation();
}