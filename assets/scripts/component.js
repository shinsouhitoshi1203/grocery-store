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
