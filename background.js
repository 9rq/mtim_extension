new Promise(resolve => {
  chrome.runtime.onInstalled.addListener(resolve)
}).then(() => {
  return new Promise(resolve => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, resolve)
  })
}).then(() => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'developer.mozilla.org',
          schemes: ['https']
        }
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }])
})


function initialize(){
    chrome.storage.local.clear();
    chrome.storage.local.set({'times': ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00']});
    console.log('initialized storage.local');
}

chrome.runtime.onInstalled.addListener(initialize);
