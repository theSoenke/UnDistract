function loadURLs () {
  let urlResult = window.browser.storage.local.get({ bannedSites: [] })
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
  let urlsSplitted = urlsText.value.split(/\s+/)

  let urlList = window.browser.storage.local.set({
    bannedSites: urlsSplitted
  })

  urlList.then(null, onError)
}

function onError (error) {
  console.log(`Error: ${error}`)
}

function displayURLs (sites) {
  let urlsText = document.getElementById('urls_text')
  urlsText.value = ''

  for (let i = 0; i < sites.length; i++) {
    urlsText.value += sites[i] + '\n'
  }
}

document.getElementById('save_urls').addEventListener('click', saveURLs)
loadURLs()
