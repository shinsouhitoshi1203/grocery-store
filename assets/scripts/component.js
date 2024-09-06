// 
const breakpoint = 992 - 0.02;

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


// function categoryShow(e, v) {

//     function switchObject(selector="", classToToggle="",pointerType="directly", realPointer="") {
//         var object = document.querySelectorAll(selector);
//         if (selector==""||classToToggle==""||realPointer=="") return;
//         if (pointerType=="directly") {
//             object.forEach(c=>{c.classList.remove(classToToggle)});
//             e.classList.add(classToToggle);
//         } else if (pointerType=="targetToChild") {
//             var firstChild = e.querySelector(realPointer);
            
//         }
//     }
//     try {
//         var allCategoriesLink = document.querySelectorAll(".megamenu__meta-item");
//         allCategoriesLink.forEach(c=>{c.classList.remove("megamenu__meta-item--hover")})
//         e.classList.add("megamenu__meta-item--hover");
        
//         var allCategories = document.querySelectorAll(".megamenu__submenu");
//         var o = e.querySelector(".megamenu__submenu");
//         allCategories.forEach(c=>{c.querySelector(".megamenu__submenu").classList.remove("megamenu__submenu--appeared")})
//         o.classList.add("megamenu__submenu--appeared");

//     } catch (error) {
//         alert("There isn't any item available right now")
//     }
//     v.stopPropagation();
// }

// toggle dropdown navigation bar (responsive options)
function toggleNavigationBar(b, isForce=false) {
    //var o = document.querySelector(".navbar__overlay");
    var t = document.querySelector(b.getAttribute("target-item"));
    function show() {
        t.classList.remove("navbar--hide");
        t.classList.add("navbar--show");
    }
    function hide() {
        t.classList.remove("navbar--show");
        t.classList.add("navbar--hide");
    }
    if (!isForce) {
        if (t.classList.contains("navbar--hide")) {
            show();
        } else {
            hide();
        }
    } else {
        hide();
    }
}

// toggle megamenu by javascript
function menuOption(e,event, action="", fromInner=false) {

    // please always add references to the following constants before debugging. 
    const breakpoint = 992 - 0.02; 
    const classToTarget = "navbar__item";
    const classShow = `${classToTarget}--show`;

    // prevent from javascript propagation
    function isDirectlyTarget(event, className="") {
        return (event.target.parentNode.classList.contains(className)) ? true : false;
    }

    function toggle(e, event) {
        if (isDirectlyTarget(event, classToTarget)){
            e.classList.toggle(classShow);
        }
    }

    // switch the menu off manually ONLY IN desktop
    function switchOff (e, event) {
        con1 = isDirectlyTarget(event, classToTarget);
        if ((con1)) e.classList.remove(classShow);
    }

    function switchOn (e, event) {
        function hasSubmenuOpened() {
            return (document.querySelector(".megamenu__submenu--show")) ? true : false;
        }

        if (isDirectlyTarget(event, classToTarget)) {
            if (!hasSubmenuOpened()) {
                var firstSubMegamenu = document.querySelector('.megamenu--mixed').querySelector('.megamenu__meta-item');
                subMenuOption(firstSubMegamenu,event,"add")
            } 
            e.classList.add(classShow);
        }            
    }

    // only keep for the desktop version
    function keep(e) {
        var i = Number.parseInt(e.getAttribute("from"));
        document.querySelectorAll(`.${classToTarget}`)[i].classList.add(classShow)
    }
    function switchOffFromInner(e) {
        var i = Number.parseInt(e.getAttribute("from"));
        document.querySelectorAll(`.${classToTarget}`)[i].classList.remove(classShow)
    }

    if (window.innerWidth < breakpoint) {
        switch (action) {
            case 'toggle':
                toggle(e, event);
                break;
        }
    } else {
        setMegaMenuArrowPosition();
        switch (action) {
            case 'add':
                switchOn (e, event)
                break;
            case 'remove':
                if (!fromInner) {switchOff(e, event)} else {switchOffFromInner(e)}
                break;
            case 'keep':
                keep(e);
                break;
        }
    }
    
    event.stopPropagation();
}


    function toggleMegamenu (e, event) {
        function handler(t) {
            if (event.target.parentNode.classList.contains("navbar__item")){
                t.classList.toggle("navbar__item--show");
            }
        }
        if (window.innerWidth < 991.98) {
            handler(e);
        }
    }

    function keepMegamenu(e, event) {
        var i = Number.parseInt(e.getAttribute("from"));
        
        if (window.innerWidth >= 991.98) {
            document.querySelectorAll(".navbar__item")[i].classList.add("navbar__item--show");
        }

        event.stopPropagation();
    }

    function toggleMegamenuOff (e, event) {
        setMegaMenuArrowPosition();
        if (window.innerWidth >= 991.98) {
            con1 = event.target.parentNode.classList.contains("navbar__item");
            con2 = event.target.classList.contains("megamenu__inner");
            if ((con1)||(true)){
                e.classList.remove("navbar__item--show");
            }
        }
    }

    function toggleMegamenuOn (e, event) {
        function hasSomethingOpened(e) {
            return (document.querySelector(".megamenu__submenu--show")) ? true : false;
        }
        setMegaMenuArrowPosition();
        if (window.innerWidth >= 991.98) {
            if (event.target.parentNode.classList.contains("navbar__item")) {
                if (!hasSomethingOpened(e)) {
                    var firstSubMegamenu = document.querySelector('.megamenu--mixed').querySelector('.megamenu__meta-item');
                    subMenuOption(firstSubMegamenu,event,"add")
                } else {
                } 
                e.classList.add("navbar__item--show");
            }
        }
            
    }

// toggle submenu

function subMenuOption(e,event, action="") {
    const breakpoint = 992 - 0.02; 
    var target = ".megamenu__submenu";

    function classOption(o, className="", option="", classToTackle="") {
        classToTackle = (classToTackle.includes("--")) ? classToTackle : `${className.substring(1)}--${classToTackle}`;
        if (o) {
            switch (option) {
                case 'toggle':
                    o.querySelector(className).classList.toggle(classToTackle);
                    break;
                case 'add':
                    o.querySelector(className).classList.add(classToTackle);
                    break;
                case 'remove':
                    o.querySelector(className).classList.remove(classToTackle);
                    break;
            }
        }
    }

    function killAll(e, event) {
        var o = e.parentNode.querySelectorAll(".megamenu__meta-item");
        o.forEach(s=>switchOff(s, event));
    }

    function switchOff (e,event) {
        try {classOption(e,target,"remove","show")} catch (error) {}
    }

    function switchOn (e,event) {
        try {classOption(e,target,"add","show");} catch (error) {}
    }

    function toggle (e, event, typeOfResponse = "desktop") {
        function toggleOthers () {
            try {
                if (event.target.parentNode.classList.contains("megamenu__meta-item")){
                    classOption(e,target,"toggle","show");
                    e.scrollIntoView();
                }
            }  catch (error) {}
        }
        function toggleDesktop () {
            try {
                killAll(e, event);
                classOption(e,target,"add","show");
            }  catch (error) {}
        }
        switch (typeOfResponse) {
            case 'desktop':
                toggleDesktop()
                break;
            case 'others':
                toggleOthers ()
                break;
        }
    }

    // one for all options
    if (action) {
        if (window.innerWidth >= breakpoint) {
            switch (action) {
                case 'add':
                    switchOn(e, event);
                    break;
                case 'remove':
                    switchOff(e, event);
                    break;
                case 'toggle':
                    toggle(e, event, "desktop");
                    break;
                case 'removeAll':
                    killAll(e, event);
                    break;
            }
        } else {
            switch (action) {
                case 'toggle':
                    toggle(e, event, "others");
                    break;
            }
        }
        event.stopPropagation();
    }
}






// toggle submenu (old)
    function classOption(o = document, className="", option="", classToTackle="") {
        classToTackle = (classToTackle.includes("--")) ? classToTackle : `${className.substring(1)}--${classToTackle}`;
        console.log(classToTackle);
        if (true) {
            switch (option) {
                case 'toggle':
                    o.querySelector(className).classList.toggle(classToTackle);
                    break;
                case 'add':
                    o.querySelector(className).classList.add(classToTackle);
                    break;
                case 'remove':
                    o.querySelector(className).classList.remove(classToTackle);
                    break;
                default:
                    break;
            }
        }
    }
    function getRidAllSubMegamenu(e, event) {
        var o = e.parentNode.querySelectorAll(".megamenu__meta-item");
        o.forEach(s=>toggleSubMegamenuOff(s, event));
    }

    function toggleSubMegamenu (e, event) {
        var target = ".megamenu__submenu";
        if (window.innerWidth<=breakpoint) {
            try {
                if (event.target.parentNode.classList.contains("megamenu__meta-item")){
                    classOption(e,target,"toggle","show");
                    e.scrollIntoView();
                }
            }  catch (error) {}
        } else {
            try {
                getRidAllSubMegamenu(e, event);
                classOption(e,target,"add","show");
            }  catch (error) {}
        }
    }
    function toggleSubMegamenuOff (e,event) {
        var target = ".megamenu__submenu";
        setMegaMenuArrowPosition();
        if (window.innerWidth >= breakpoint) {
            try {classOption(e,target,"remove","show"); /* e.querySelector(".megamenu__submenu").classList.remove("megamenu__submenu--show"); */} catch (error) {}
        }
        event.stopPropagation();
    }
    function toggleSubMegamenuOn (e,event) {
        var target = ".megamenu__submenu";
        setMegaMenuArrowPosition();
        if (window.innerWidth >= breakpoint) {
            try { classOption(e,target,"add","show");} catch (error) {}
        }
        event.stopPropagation();
    }
