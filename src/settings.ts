function loadURLs() {
  let urlResult = localStorage.get({ bannedSites: [] })
  urlResult.then(
    function (result: any) {
      let bannedSites = result.bannedSites

      if (bannedSites) {
        displayURLs(bannedSites)
      }
    },
    (err: Error) => {
      console.log(`Error: ${err}`)
    });
}

function saveURLs() {
  let urlsText = document.getElementById('urls_text');
  let urlsSplitted = urlsText.textContent.split(/\s+/);
  storeURLs(urlsSplitted);
}

function storeURLs(bannedSites: string[]) {
  let urlList = (<any>window).browser.storage.local.get.set({
    bannedSites: bannedSites
  })

  urlList.then(null, (err: Error) => {
    console.error(`Could not store URLs: ${err}`)
  })
}

function displayURLs(sites: string[]) {
  let urlsText = document.getElementById('urls_text');
  urlsText.textContent = ''

  for (let i = 0; i < sites.length; i++) {
    urlsText.textContent += sites[i] + '\n'
  }
}

document.getElementById('save_urls').addEventListener('click', saveURLs)
loadURLs()
