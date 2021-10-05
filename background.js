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
