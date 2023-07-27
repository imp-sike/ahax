// HTTP function with support for GET, POST, DELETE, and UPDATE
async function http(event) {
    event.preventDefault();
    var runner = event.target;
    var interceptor = runner.getAttribute("hs-interceptor");
    var path = runner.getAttribute("hs-path");
    var loader = runner.getAttribute("hs-loader");
    var target = runner.getAttribute("hs-target");
    var method = runner.getAttribute("hs-method");

    if (loader) {
        document.querySelector(loader).style.display = "block";
    }

    if (method.toLowerCase() === "get") {
        await hs_get(event, runner, interceptor, path, target);
    } else if (method.toLowerCase() === "post") {
        await hs_post(event, runner, interceptor, path, target);
    } else if (method.toLowerCase() === "delete") {
        await hs_delete(event, runner, interceptor, path, target);
    } else if (method.toLowerCase() === "put") {
        await hs_update(event, runner, interceptor, path, target);
    }

    if (loader) {
        document.querySelector(loader).style.display = "none";
    }
}

// GET REQUEST HANDLER
async function hs_get(event, runner, interceptor, path, target) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path + "?" + data, { method: "get" }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}

// POST REQUEST HANDLER
async function hs_post(event, runner, interceptor, path, target) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path, { method: "post", body: data }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}

// DELETE REQUEST HANDLER
async function hs_delete(event, runner, interceptor, path, target) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path, { method: "delete", body: data }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}


// UPDATE REQUEST HANDLER
async function hs_update(event, runner, interceptor, path, target) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path, { method: "put", body: data }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}
