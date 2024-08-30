

function requireReload(t,s) {
    return new Promise (
        function (resolve, reject) {
            loadComponent(t, s);
            setTimeout(()=>{resolve()},100);
        }
    )
}

function load(list) {
    var map = new Array(list.length).fill(0);
    var arr = [], later = [];
    for (var i=0;i<list.length;i++){
        var obj = list[i];
        var t = obj.target;
        var s = obj.src;
        console.log(obj);
        var preload_id = obj.preload; 
        if (preload_id) {
            var preload_target = list[preload_id].target;
            var preload_src = list[preload_id].src;
        }
        if (map[i]==0) {
            if ((preload_target!="")&&(preload_target!=null)) {
                map[preload_id] = 1;
                var promise = requireReload(preload_target,preload_src);
                arr.push(promise);
                later.push(obj);
            } else {
                loadComponent(t, s);
            }
            map[i]=1;
        }
    }
    Promise.all(arr).then(
        function () {
            console.log(later);
            later.forEach((obj)=>{
                var t = obj.target;
                var s = obj.src;
                loadComponent(t, s);
            })
        }
    )
}

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
        console.log(target)
        if (!o.innerHTML) o.innerHTML = raw;
    }
    
    // localStorage.getItem(target)
    if (false) {
        o.innerHTML = localStorage.getItem(target);
    } else {
        retrieveData(src, dataHandler);
    }
}