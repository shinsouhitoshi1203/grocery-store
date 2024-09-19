// 
const breakpoint = 992 - 0.02;

// Load components
async function loadElements(list) {
    var arr = [], handler=[];
    async function getData(t,s) {
        var httpResult = await fetch(s);
        var rawResult = await httpResult.text();
        arr.push(rawResult);
    }
    
    list.forEach((obj)=>{
        var t = obj.target;
        var s = obj.src;
        var app = obj.append;
        arr.push (
            new Promise (
                function(resolve) {
                    fetch(s).then((h)=>h.text()).then((r)=>{
                        resolve({
                            target: t,
                            append: app,
                            html: r,
                        }); 
                    })
                }
            )
        )
         
    });
    function dataHandler(target,raw,append) {
        var o = document.querySelectorAll(target);
        localStorage.setItem(target, raw);
        o.forEach( (e)=>{
            if (true) {
                // console.log(raw)
                // console.log(append)
                if (append) {
                    e.innerHTML += raw;
                } else {
                    e.innerHTML = raw;
                }
            }
        } )
    }
    Promise.all(arr).then((a)=>{
        a.forEach(o=>{
            dataHandler(o.target, o.html, o.append)
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

// toggle megamenu by javascript
function actionOption(e,event, action="", fromInner=false) {

    // please always add references to the following constants before debugging. 
    const breakpoint = 767 - 0.02; 
    const classToTarget = "action";
    const classShow = `d-none`;

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
        let o = document.querySelectorAll(`.${classToTarget}`)[e.getAttribute("data-node")]        
        if (o) o.classList.add(classShow);
    }

    function switchOn (e, event) {
        let o = document.querySelectorAll(`.${classToTarget}`)[e.getAttribute("data-node")]        
        if (o) o.classList.remove(classShow);
    }
    // only keep for the desktop version
    function keep(e) {
        var i = Number.parseInt(e.getAttribute("data-node"));
        document.querySelectorAll(`.${classToTarget}`)[i].classList.remove(classShow)
    }
    if (window.innerWidth < breakpoint) {
        switch (action) {
            case 'toggle':
                //toggle(e, event); do nothing rn
                break;
        }
    } else {
        switch (action) {
            case 'add':
                switchOn (e, event)
                break;
            case 'remove':
                switchOff(e, event);
                break;
            case 'keep':
                keep(e);
                break;
        }
    }
    
    event.stopPropagation();
}



function productItem(name="",desc="",price="",rate="",thumb="",url="") {
    this.productName = name;
    this.productDesc = desc;
    this.productPrice = price;
    this.productRating = rate;
    this.productThumbnail = thumb;
    this.productUrl = url;

}

var productList = [
    new productItem("Coffee Beans - Espresso Arabica and Robusta Beans","Larvatta", "$47.00", 4.3, "./products/cafe-01.png", "#!"),
    new productItem("Lavazza Coffee Blends - Try the Italian Espresso","Lorem 1000", "$99.00", 3.3, "./products/cafe-02.png", "#!"),
    new productItem("Lavazza - Caffè Espresso Black Tin - Ground coffee","Hello world", "$38.65", 5.0, "./products/cafe-03.png", "#!"),
    new productItem("Qualità Oro Mountain Grown - Espresso Coffee Beans","Larvatta", "$20.00", 2.3, "./products/cafe-04.png", "#!"),
]

/* <div class="col">
                        <div title="Coffee Beans - Espresso Arabica and Robusta Beans" class="product__item ">
                            <a href="#!" class="product__item-wrapper"></a>
                            <div class="product__thumbnail">
                                <a href="#!"><img src="./products/cafe-01.png" alt="Coffee Beans - Espresso Arabica and Robusta Beans"></a>
                                <button class="product__reaction" >
                                    <img src="./icons/heart-color.svg" class="product__like" alt="">
                                    <img src="./icons/heart.svg" class="product__unlike webpage__icon" alt="">
                                </button>
                            </div>
                            <article class="product__meta">
                                <h3 class="product__name">Coffee Beans - Espresso Arabica and Robusta Beans</h3>
                                <p class="product__desc">Lavazza</p>
                                <div class="product__sub">
                                    <span class="product__price">$47.00</span>
                                    <div class="product__rating">
                                        <img src="./icons/star.svg" alt="" class="product__rating-img">
                                        <span>4.3</span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div> */
    

// load groups
function loadGroup(type="", target="", handler) {

    // load products and event listeners
    async function loadProducts() {
        var raw = [];
        const httpResult = await fetch("./data/product.txt");
        const json = (await httpResult.json());
        for(var o of json) {
            var name = o.productName, desc = o.productDesc, thumb = o.productThumbnail, rate = (o.productRating).toFixed(1), price = `\$${Number.parseFloat(o.productPrice).toFixed(2)}`,link = `./product.html`; //link = `./product/item/${o.productUrl}`;
            var elementRaw = `<div class="col">
                        <div title="${name}" class="product__item ">
                             
                            <div class="product__thumbnail">
                                <a href="${link}"><img src="${thumb}" alt="${name}"></a>
                                <button class="product__reaction" title="Add to favourite items">
                                    <img src="./icons/heart-color.svg" class="product__like" alt="">
                                    <img src="./icons/heart.svg" class="product__unlike webpage__icon" alt="">
                                </button>
                            </div>
                            <article class="product__meta">
                                <a href="${link}"><h3 class="product__name">${name}</h3></a>
                                <p class="product__desc">${desc}</p>
                                <div class="product__sub">
                                    <span class="product__price">${price}</span>
                                    <div class="product__rating">
                                        <img src="./icons/star.svg" alt="" class="product__rating-img">
                                        <span>${rate}</span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>`;
            raw.push(elementRaw);
        }
        return raw.join('');
    }
    function toggleReaction(e) {
        function recursion(e) {
            var obj = e, i=0;
            while (!obj.classList.contains("product__item")) {
                obj = obj.parentNode;
                i++; if (i>10) return '';
            }
            return obj;
        }
        e.stopPropagation();
        var target = recursion(e.target);
        if (target) target.classList.toggle("product__item--liked");
    }

    // toggle tabs
    function tabSelect (e) {
        let n = 0;

        function recursion(e) {
            var obj = e, i=0;
            while (!obj.classList.contains("tab-heading-item")) {
                obj = obj.parentNode;
                i++; if (i>10) return '';
            }
            return obj;
        }
        function remove() {
            var o = document.querySelectorAll(".tab-heading-item");
            o.forEach(e=>{e.classList.remove("tab-selected")});
            o = document.querySelectorAll(".tab-page-item");
            o.forEach((e,i)=>{
                e.classList.remove("tab-selected");
            })
        } 
        remove();
        var t = recursion(e.target);
        t.classList.add("tab-selected");
        n = t.getAttribute("data-target");
        document.querySelectorAll(".tab-page-item")[n].classList.add("tab-selected");
    }
    switch (type) {
        case 'product':
            Promise.all([loadProducts()]).then(
                ([e])=>{
                    console.log(document.querySelector('.product__list'));
                    document.querySelector('.product__list').innerHTML += (e);
                    var o = document.querySelectorAll(".product__reaction");
                    o.forEach(e=>{e.addEventListener("click",toggleReaction)})
                }
            );
            break;
        case 'tab-toggle':
            var o = document.querySelectorAll(".tab-heading-item");
            o.forEach(e=>{e.addEventListener("click",tabSelect)})
            break; 
        default:
            break;
    }
} 

function addEventGroup(target, event, handler) {
    target.forEach(o=>{
        o.addEventListener(event, handler);
    })
}

function searchHandler() {
    var o=document.querySelector('html').getAttribute('theme'); document.querySelector('html').setAttribute('theme',o=='light'?'dark':'light')
    var o=document.querySelector('.search-bar'); o.classList.toggle("search-bar__appeared")
}