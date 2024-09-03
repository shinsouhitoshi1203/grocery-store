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


window.addEventListener("resize", setMegaMenuArrowPosition);
window.onscroll = (e)=> {
    if (window.scrollY >= 80) {
        document.querySelector("header").classList.add("header--scrolling");
        
    } else if (window.scrollY < 80) {
        document.querySelector("header").classList.remove("header--scrolling");
    }
}
function loadMegamenuOnHover() {
    var o = document.querySelectorAll(".navbar__item");
    console.log(o);

    o.forEach ( 
        function(i) {
            i.addEventListener("mouseover",()=>{
                setMegaMenuArrowPosition();
            })
        }
    )
}