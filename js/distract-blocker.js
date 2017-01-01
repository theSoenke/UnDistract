var bannedSites = browser.storage.local.get("bannedSites");
bannedSites.then(onGotSites, onError);

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGotSites(result) {
    bannedSites = result[0].bannedSites;
    if (bannedSites) {
        bannedSites = bannedSites.split(/\s+/);
        console.log(bannedSites);
        bannedUrls = bannedSites;

        checkSites(bannedSites);
    }
}

function checkSites(bannedSites) {
    console.log(window.location);
    var hostname = window.location.hostname;

    bannedSites.forEach(function (site) {
        if (site === hostname) {
            banCurrentSite();
        }
    });
}

function banCurrentSite() {
    var div = document.createElement("div");

    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('../views/banned.html'), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            div.innerHTML = xhr.responseText;
            document.documentElement.appendChild(div);

            document.head.innerHTML = "";
            document.body.className = "";
            document.body.innerHTML = "";
        }
    };
    xhr.send();
}
