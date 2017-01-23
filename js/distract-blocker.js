let bannedSites = window.browser.storage.local.get('bannedSites')
bannedSites.then(onGotSites, onError)

function onError (error) {
  console.log(`Error: ${error}`)
}

function onGotSites (result) {
  let bannedUrls = result[0].bannedSites
  if (bannedUrls) {
    bannedUrls = bannedUrls.split(/\s+/)
    checkSites(bannedUrls)
  }
}

function checkSites (bannedSites) {
  let hostname = window.location.hostname

  bannedSites.forEach(function (site) {
    if (site === hostname) {
      banCurrentSite()
    }
  })
}

function banCurrentSite () {
  let div = document.createElement('div')

  let xhr = new window.XMLHttpRequest()
  xhr.open('GET', window.browser.extension.getURL('../views/banned.html'), true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === window.XMLHttpRequest.DONE && xhr.status === 200) {
      div.innerHTML = xhr.responseText
      document.documentElement.appendChild(div)

      document.head.innerHTML = ''
      document.body.className = ''
      document.body.innerHTML = ''
    }
  }
  xhr.send()
}
