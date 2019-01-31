let bannedSites = (<any>window).browser.storage.local.get('bannedSites')
bannedSites.then(onGotSites, onError)

function onError(err: Error) {
  console.log(`Error: ${err}`)
}

function onGotSites(result: any) {
  let bannedUrls = result[0].bannedSites
  if (bannedUrls) {
    checkSites(bannedUrls)
  }
}

function checkSites(bannedSites: string[]) {
  let hostname = window.location.hostname

  bannedSites.forEach(site => {
    if (site === hostname) {
      banCurrentSite()
    }
  })
}

function banCurrentSite() {
  let div = document.createElement('div')

  let xhr = new XMLHttpRequest()
  xhr.open('GET', (<any>window).browser.extension.getURL('../views/banned.html'), true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      div.innerHTML = xhr.responseText
      document.documentElement.appendChild(div)

      document.head.innerHTML = ''
      document.body.className = ''
      document.body.innerHTML = ''
    }
  }
  xhr.send()
}
