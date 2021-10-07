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
    console.log('initialized storage.local');
    chrome.storage.local.get(['times'], (result) => {
        if (!result.hasOwnProperty('times')) {
            console.log('key not found');
            chrome.storage.local.set({'times': ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00']});
        }else{
            console.log(result.times);
        }
    })
}
// it won't work :(
chrome.runtime.onInstalled.addListener(initialize);
