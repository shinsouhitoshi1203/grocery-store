

function requireReload(t,s) {
    return new Promise (
        function (resolve, reject) {
            loadComponent(t, s);
            resolve();
        }
    )
}

function load(list) {
    var map = new Array(list.length).fill(0);
    list.forEach(
        function (obj,i) {
            var t = obj.target;
            var s = obj.src;
            var preload_id = obj.preload, 
                preload_target = list[preload_id].target, 
                preload_src = list[preload_id].src;
            if (map[i]) {
                console.log(111);
            } else {
                if (preload_target) {
                    requireReload(preload_target,preload_src)
                        .then (
                            function () {
                                setTimeout(()=>{loadComponent(t, s)},50);
                                map[preload_id] = 1;
                            }
                        )
                } else {
                    loadComponent(t, s);
                }
                map[i]=1;
            }
        }
    )
}
document.addEventListener("DOMContentLoaded", () => {
    load(loadList);
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
        var o = document.querySelector(target);
        localStorage.setItem(target, raw);
        o.innerHTML = raw;
    }
    
    // localStorage.getItem(target)
    if (false) {
        o.innerHTML = localStorage.getItem(target);
    } else {
        retrieveData(src, dataHandler);
    }
}