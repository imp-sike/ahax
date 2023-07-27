// HTTP function with support for GET, POST, DELETE, and UPDATE
async function http(event) {
    event.preventDefault();
    var runner = event.target;
    var interceptor = runner.getAttribute("hs-interceptor");
    var path = runner.getAttribute("hs-path");
    var loader = runner.getAttribute("hs-loader");
    var target = runner.getAttribute("hs-target");
    var method = runner.getAttribute("hs-method");
    const headersAttr = runner.getAttribute("hs-headers");

    // Parse custom headers attribute if present
    let headers = {};
    if (headersAttr) {
        try {
            headers = JSON.parse(headersAttr);
        } catch (error) {
            console.error("Error parsing hs-headers attribute. Make sure it's a valid JSON object.");
            return;
        }
    }

    if (loader) {
        document.querySelector(loader).style.display = "block";
    }

    if (method.toLowerCase() === "get") {
        await hs_get(event, runner, interceptor, path, target, headers);
    } else if (method.toLowerCase() === "post") {
        await hs_post(event, runner, interceptor, path, target, headers);
    } else if (method.toLowerCase() === "delete") {
        await hs_delete(event, runner, interceptor, path, target, headers);
    } else if (method.toLowerCase() === "put") {
        await hs_update(event, runner, interceptor, path, target, headers);
    }

    if (loader) {
        document.querySelector(loader).style.display = "none";
    }
}

// GET REQUEST HANDLER with custom headers
async function hs_get(event, runner, interceptor, path, target, headers) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path + "?" + data, { method: "get", headers }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}

// POST REQUEST HANDLER with custom headers
async function hs_post(event, runner, interceptor, path, target, headers) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path, { method: "post", body: data, headers }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}

// DELETE REQUEST HANDLER with custom headers
async function hs_delete(event, runner, interceptor, path, target, headers) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path, { method: "delete", body: data, headers }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}

// UPDATE REQUEST HANDLER with custom headers
async function hs_update(event, runner, interceptor, path, target, headers) {
    const data = new URLSearchParams();
    if (runner.tagName.toLowerCase() === "form") {
        const incomingData = new FormData(event.target);
        incomingData.forEach((value, key) => {
            data.append(key, value);
        });
    }
    await fetch(path, { method: "put", body: data, headers }).then(res => res.text())
        .then(async res => {
            if (interceptor) {
                window[interceptor](await JSON.parse(res));
            }
            if (target) {
                document.querySelector(target).innerHTML = res;
            }
        });
}
