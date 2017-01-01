loadURLs()

function loadURLs() {
  var urlResult = browser.storage.local.get()
  urlResult.then(
    function (result) {
      if (!result.bannedSites) {
        return false
      }

      bannedSites = result.bannedSites
      displayURLs(bannedSites)
    },
    onError)
}

function saveURLs() {
  var urlsText = document.getElementById('urls_text');

  var urlList = browser.storage.local.set({
    bannedSites: urlsText.value
  })

  urlList.then(null, onError)
}

function onError(error) {
  console.log(`Error: ${error}`)
}

function displayURLs(sites) {
  var urlsText = document.getElementById('urls_text');
  urlsText.value = sites;
}

document.getElementById('save_urls').addEventListener('click', saveURLs)
