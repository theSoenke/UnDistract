const browser = (<any>window).browser;
let btnSettings = document.getElementById('settings_btn')
let btnBlock = document.getElementById('block_btn')

btnSettings.addEventListener('click', function () {
  browser.runtime.openOptionsPage()
})

btnBlock.addEventListener('click', function () {
  console.log("hello");

  browser.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
    let tab = tabs[0]
    let url = extractHostname(tab.url)
    blockSite(url, tab)
  })
})

function blockSite(hostname: string, tab: any) {
  let urlResult = (<any>window).browser.storage.local.get.get({ bannedSites: [] })
  urlResult.then(
    function (result: any) {
      let bannedSites = result.bannedSites ? result.bannedSites : []

      if (hostname.includes('www.')) {
        let url = hostname.split('www.')[1]
        bannedSites.push(url)
      } else {
        bannedSites.push('www.' + hostname)
      }
      bannedSites.push(hostname)

      storeURLs(bannedSites)
      browser.tabs.reload(tab.id)
    },
    (err: Error) => {
      console.log(`Error: ${err}`);
    });
}



function extractHostname(url: string) {
  let parser = document.createElement('a')
  parser.href = url
  return parser.hostname
}
