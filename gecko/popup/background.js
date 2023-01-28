function setIconBasedOnStorage(hide_thumbs, hide_titles) {
    if (hide_thumbs == false && hide_titles == false)
        browser.browserAction.setIcon({ path: "icons/icon_off-128.png" });
    if (hide_thumbs == true || hide_titles == true)
            browser.browserAction.setIcon({ path: "icons/icon_mid-128.png" });
    if (hide_thumbs == true && hide_titles == true)
        browser.browserAction.setIcon({ path: "icons/icon-128.png" });
}

function loadSettings() {
    console.log("Loading settings!")
    gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then((settings) => {
        if (settings == null || settings == undefined || JSON.stringify(settings) === '{}') {
            browser.storage.local.set(
                { 
                    hide_thumbs: true,
                    hide_titles: true
                }
            )
        }
        console.log(settings)
        setIconBasedOnStorage(settings.hide_thumbs, settings.hide_titles)
    })
}

browser.storage.local.onChanged.addListener((changes) => {
    setIconBasedOnStorage(changes['hide_thumbs'].newValue, changes['hide_titles'].newValue)
})

//Listen for installed event, first initialization
browser.runtime.onInstalled.addListener(loadSettings);

//Listen for startup event, loads previous settings
browser.runtime.onStartup.addListener(loadSettings);
