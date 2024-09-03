var li = [
    {
        target : ".brand",
        preload: 1,
        src : "./assets/components/brand.html"
    },
    {
        target : "header",
        src : "./assets/components/header.html"
    },
    {
        target : "footer",
        src : "./assets/components/footer.html"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    load(li);
})


window.addEventListener("resize", setMegaMenuArrowPosition);

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