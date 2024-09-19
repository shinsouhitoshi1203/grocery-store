var li = [
    {
        target : ".brand",
        append : false,
        src : "./assets/components/brand.html"
    },
];
document.addEventListener("DOMContentLoaded", () => {
    loadElements(li);
    triggerTextFocusList(".txtbox__type-3");
    tickCheckbox();
    document.querySelector(".log__next").addEventListener("click",()=>{switchToForm()}); 
})

function switchToForm() {
    document.querySelector(".log__container").classList.remove("log__d-none")
}



// nextElementSibling