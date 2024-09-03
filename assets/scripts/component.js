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

function categoryShow(e) {
    try {
        document.querySelector(".megamenu__contents").innerText = "";
        var allCategories = document.querySelectorAll(".megamenu__submenu");
        allCategories.forEach(c=>{c.classList.remove("megamenu__submenu--appeared")})
        var o = e.querySelector(".megamenu__submenu");
        o.classList.add("megamenu__submenu--appeared");
    } catch (error) {
        document.querySelector(".megamenu__contents").innerText = "Nothing to show here";
    }
}