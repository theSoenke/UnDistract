let btnSettings = document.getElementById('settings_btn')
let btnBlock = document.getElementById('block_btn')

btnSettings.addEventListener('click', function () {
  window.browser.runtime.openOptionsPage()
})

btnBlock.addEventListener('click', function () {
  window.browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url
    url = extractHostname(url)
    blockSite(url)
  })
})

function blockSite (hostname) {
  let urlResult = window.browser.storage.local.get()
  urlResult.then(
    function (result) {
      let bannedSites = result.bannedSites ? result.bannedSites : ''
      bannedSites += hostname + '\n'
      saveURLs(bannedSites)
    },
    onError)
}

function saveURLs (bannedSites) {
  let urlList = window.browser.storage.local.set({
    bannedSites: bannedSites
  })

  urlList.then(null, onError)
}

function onError (error) {
  console.log(`Error: ${error}`)
}

function extractHostname (url) {
  let parser = document.createElement('a')
  parser.href = url
  return parser.hostname
}
