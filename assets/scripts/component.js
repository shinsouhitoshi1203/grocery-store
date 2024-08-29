var loadList = [
    {
        target : "header",
        src : "./assets/components/header.html"
    },
    {
        target : "footer",
        src : "./assets/components/footer.html"
    }
]

document.addEventListener("DOMContentLoaded", () => {
    loadList.forEach(
        function (obj) {
            loadComponent(obj.target, obj.src);
        }
    )
})

function loadComponent (target, src) {
    function retrieveData (src, handler) {
        fetch(src)
            .then (
                function (httpResult) {
                    return httpResult.text();
                }
            )
            .then (
                function (rawResult) {
                    handler(rawResult)
                }
            );
    }

    function dataHandler(raw) {
        localStorage.setItem(target, raw);
        o.innerHTML = raw;
    }
    
    var o = document.querySelector(target);
    // localStorage.getItem(target)
    if (false) {
        o.innerHTML = localStorage.getItem(target);
    } else {
        retrieveData(src, dataHandler);
    }
}