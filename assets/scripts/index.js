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

document.addEventListener("resize", setMegaMenuArrowPosition);