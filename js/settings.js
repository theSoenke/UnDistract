function loadURLs () {
  let urlResult = window.browser.storage.local.get()
  urlResult.then(
    function (result) {
      let bannedSites = result.bannedSites

      if (bannedSites) {
        displayURLs(bannedSites)
      }
    },
    onError)
}

function saveURLs () {
  let urlsText = document.getElementById('urls_text')

  let urlList = window.browser.storage.local.set({
    bannedSites: urlsText.value
  })

  urlList.then(null, onError)
}

function onError (error) {
  console.log(`Error: ${error}`)
}

function displayURLs (sites) {
  let urlsText = document.getElementById('urls_text')
  urlsText.value = sites
}

document.getElementById('save_urls').addEventListener('click', saveURLs)
loadURLs()
