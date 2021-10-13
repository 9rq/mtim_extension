// to decide in which website popup is available
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
                    hostEquals: 'whm.accenture.com',
                    pathEquals: '/mytim/secure/punchClock/confirm',
                    schemes: ['https']
                }
            })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
})
