var btnSettings = document.getElementById('settings_btn');
var btnBlock = document.getElementById('block_btn');

btnSettings.addEventListener('click', function () {
    browser.runtime.openOptionsPage();
});

btnBlock.addEventListener('click', function () {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url;
        blockSite(url);
    });
});

function blockSite(hostname) {
    var urlResult = browser.storage.local.get()
    urlResult.then(
        function (result) {
            var bannedSites = result.bannedSites ? result.bannedSites : '';
            bannedSites += '\n' + hostname;
            saveURLs(bannedSites);
        },
        onError)
}

function saveURLs(bannedSites) {
    var urlList = browser.storage.local.set({
        bannedSites: bannedSites
    })

    urlList.then(null, onError)
}

function onError(error) {
    console.log(`Error: ${error}`)
}
