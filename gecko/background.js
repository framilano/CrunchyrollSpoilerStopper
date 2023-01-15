function loadSettings() {
    gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then((settings) => {
        if (settings.status == null || settings.status == undefined) {
            browser.storage.local.set({ status: true })
            browser.browserAction.setIcon({ path: "icons/icon-128.png" });
        }

        if (settings.status == true) 
            browser.browserAction.setIcon({ path: "icons/icon-128.png" });

        if (settings.status == false) 
            browser.browserAction.setIcon({ path: "icons/icon_off-128.png" });
    })
}

/**
 * - Dynamically changes the icon
 * - Set local storage for persistency
 */
function updateLocalStorage() {
    gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then((settings) => {
        if (settings.status == null || settings.status == undefined) {
            browser.storage.local.set({ status: false })
            browser.browserAction.setIcon({ path: "icons/icon_off-128.png" });
        }

        if (settings.status == true) {
            browser.storage.local.set({ status: false });
            browser.browserAction.setIcon({ path: "icons/icon_off-128.png" });
        }

        if (settings.status == false) {
            browser.storage.local.set({ status: true });
            browser.browserAction.setIcon({ path: "icons/icon-128.png" });

        }
    })
}

//Listen for click events ion browserAction 
browser.browserAction.onClicked.addListener(updateLocalStorage);

//Listen for installed event, first initialization
browser.runtime.onInstalled.addListener(loadSettings);

//Listen for startup event, loads previous settings
browser.runtime.onStartup.addListener(loadSettings);