
function loadSettings() {
    gettingStoredSettings = chrome.storage.local.get();
    gettingStoredSettings.then((settings) => {
        if (settings.status == null || settings.status == undefined) {
            chrome.storage.local.set({ status: true })
            chrome.action.setIcon({ path: "icons/icon-128.png" });
        }

        if (settings.status == true) 
            chrome.action.setIcon({ path: "icons/icon-128.png" });

        if (settings.status == false) 
            chrome.action.setIcon({ path: "icons/icon_off-128.png" });
    })
}

/**
 * - Dynamically changes the icon
 * - Set local storage for persistency
 */
function updateLocalStorage() {
    gettingStoredSettings = chrome.storage.local.get();
    gettingStoredSettings.then((settings) => {
        if (settings.status == null || settings.status == undefined) {
            chrome.storage.local.set({ status: false })
            chrome.action.setIcon({ path: "icons/icon_off-128.png" });
        }

        if (settings.status == true) {
            chrome.storage.local.set({ status: false });
            chrome.action.setIcon({ path: "icons/icon_off-128.png" });
        }

        if (settings.status == false) {
            chrome.storage.local.set({ status: true });
            chrome.action.setIcon({ path: "icons/icon-128.png" });

        }
    })
}

//Listen for click events ion browserAction 
chrome.action.onClicked.addListener(updateLocalStorage);

//Listen for installed event, first initialization
chrome.runtime.onInstalled.addListener(loadSettings);

//Listen for startup event, loads previous settings
chrome.runtime.onStartup.addListener(loadSettings);
