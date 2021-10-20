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


// contextMenu
// parent
chrome.contextMenus.create({
    id: "mtim",
    title: "open myTIM",
    contexts: ["page_action"],
    onclick: ()=>{
        chrome.tabs.create({url:"https://whm.accenture.com/mytim/secure/punchClock"});
    }
});
// working
//chrome.contextMenus.create({
//    id: "mtim_work",
//    title: "start working",
//    contexts: ["page_action"],
//    parentId: "mtim",
//    onclick: ()=>{
//        chrome.tabs.create({url:"https://google.com"});
//    }
//});
//// resting
//chrome.contextMenus.create({
//    id: "mtim_rest",
//    title: "start resting",
//    contexts: ["page_action"],
//    parentId: "mtim",
//    onclick: ()=>{
//        chrome.tabs.create({url:"https://google.com"});
//    }
//});
//// finish
//chrome.contextMenus.create({
//    id: "mtim_finish",
//    title: "finsh resting",
//    contexts: ["page_action"],
//    parentId: "mtim",
//    onclick: ()=>{
//        chrome.tabs.create({url:"https://google.com"});
//    }
//});
