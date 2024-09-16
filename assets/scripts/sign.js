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

function triggerTextFocusList(targetClass) {
    let classNoDot = targetClass.slice(1);
    function findParent(o) {
        let node = o;
        while (![...node.classList].includes(classNoDot)) {
            node = node.parentNode;
        }
        return node;
    }
    function removeAll(nodeList) {
        nodeList.forEach(element=>{element.classList.remove(`${classNoDot}--focus`)})
    }
    function add(node) {
        node.classList.add(`${classNoDot}--focus`)
    }
    let nodeList = document.querySelectorAll(targetClass);
    if (nodeList) {
        nodeList.forEach(element=>{
            element.addEventListener("click", (e)=> {
                var realNode = e.target;
                if (![...e.target.classList].includes(classNoDot)) realNode = findParent(realNode);
                let nodeList = document.querySelectorAll(targetClass);
                removeAll(nodeList);
                add(element);
                
                e.stopPropagation();
            })
            element.addEventListener("focusout",()=>removeAll(nodeList));
        })
    }
}

function tickCheckbox(targetClass=".checkbox") {
    let nodeList = document.querySelectorAll(targetClass);
    if (nodeList) {
        nodeList.forEach(element=>{
            let nodeReal = element.querySelector("input");
            nodeReal.addEventListener("change", (e)=> {
                if (nodeReal.checked) {
                    nodeReal.nextElementSibling.classList.add("checkbox__pseudo--checked")
                } else {
                    nodeReal.nextElementSibling.classList.remove("checkbox__pseudo--checked")
                }
                e.stopPropagation();
            })
        })
    }
    
}

// nextElementSibling