let browser = window.browser
let btnSettings = document.getElementById('settings_btn')
let btnBlock = document.getElementById('block_btn')

btnSettings.addEventListener('click', function () {
  browser.runtime.openOptionsPage()
})

btnBlock.addEventListener('click', function () {
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0]
    let url = extractHostname(tab.url)
    blockSite(url, tab)
  })
})

function blockSite (hostname, tab) {
  let urlResult = browser.storage.local.get({ bannedSites: [] })
  urlResult.then(
    function (result) {
      let bannedSites = result.bannedSites ? result.bannedSites : []

      if (hostname.includes('www.')) {
        let url = hostname.split('www.')[1]
        bannedSites.push(url)
      } else {
        bannedSites.push('www.' + hostname)
      }
      bannedSites.push(hostname)

      saveURLs(bannedSites)
      browser.tabs.reload(tab.id)
    },
    onError)
}

function saveURLs (bannedSites) {
  let urlList = browser.storage.local.set({
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
