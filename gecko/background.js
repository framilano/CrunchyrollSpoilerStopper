function setIconBasedOnStorage(hide_thumbs, hide_titles) {
    console.log("[setIconBasedOnStorage START] [hide_thumbs = %s | hide_titles = %s]", hide_thumbs, hide_titles)
    let suffix = ""
    if (hide_thumbs == false && hide_titles == false) suffix = "_off"
    if (hide_thumbs == true || hide_titles == true) suffix = "_mid"
    if (hide_thumbs == true && hide_titles == true) suffix = ""
    
    browser.action.setIcon({
        path: {
            19: 'icons/icon' + suffix + '19.png',
            38: 'icons/icon' + suffix + '38.png',
            128: 'icons/icon' + suffix + '128.png'
        }
    })
}

async function loadSettings() {
    console.debug("[loadSettings START]")
    let hide_thumbs = await browser.storage.local.get("hide_thumbs")
    let hide_titles = await browser.storage.local.get("hide_titles")
    if (hide_titles["hide_titles"] == undefined) {
        browser.storage.local.set(
            { 
                hide_thumbs: true,
                hide_titles: true
            }
        )
    } else {
        setIconBasedOnStorage(hide_thumbs["hide_thumbs"], hide_titles["hide_titles"])
    }

    if (hide_thumbs["hide_thumbs"]) stopThumbnailLoading();
    else startThumbnailLoading()

    console.info("[loadSettings STOP]")

}

browser.storage.local.onChanged.addListener(async (_changes) => {
    console.debug("Changed localStorage!")
    let hide_thumbs = await browser.storage.local.get("hide_thumbs")
    let hide_titles = await browser.storage.local.get("hide_titles")
    if (hide_thumbs["hide_thumbs"]) stopThumbnailLoading();
    else startThumbnailLoading()
    setIconBasedOnStorage(hide_thumbs["hide_thumbs"], hide_titles["hide_titles"])
    console.info("Icons changed")
})

function stopThumbnailLoading() {
    console.log("Started blocking thumbnails loading from URL")
    const ruleId = 1001;
    browser.declarativeNetRequest.getDynamicRules((rules) => {
        const alreadyExists = rules.some(r => r.id === ruleId);
        if (!alreadyExists) {
            browser.declarativeNetRequest.updateDynamicRules({
                addRules: [{
                    id: ruleId,
                    priority: 1,
                    action: { type: "block" },
                    condition: {
                        urlFilter: "*cdn-cgi/image/fit=contain,format=auto,quality=70,width=800,height=450*",
                        resourceTypes: ["image"]
                    }
                }],
                removeRuleIds: []
            });
        }
    });
}

function startThumbnailLoading() {
    console.log("Removed thumbnails url load block")
    const ruleId = 1001;
    browser.declarativeNetRequest.getDynamicRules((rules) => {
        const exists = rules.some(r => r.id === ruleId);

        if (exists) {
            browser.declarativeNetRequest.updateDynamicRules({
                addRules: [],
                removeRuleIds: [ruleId]
            });
        }
    });
}

//Listen for installed event, first initialization
browser.runtime.onInstalled.addListener(loadSettings);

//Listen for startup event, loads previous settings
browser.runtime.onStartup.addListener(loadSettings);