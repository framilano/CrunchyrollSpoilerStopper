
/**
 * - Dynamically changes the icon
 * - Set local storage for persistency
 */
function updateLocalStorage() {
    gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then((settings) => {
        if (settings.status == null || settings.status == undefined) {
            browser.storage.local.set({ status: true })
        }

        if (settings.status == true) {
            browser.storage.local.set({ status: false });
            browser.browserAction.setIcon({ path: "icons/icon_off-48.png" });
        }

        if (settings.status == false) {
            browser.storage.local.set({ status: true });
            browser.browserAction.setIcon({ path: "icons/icon-48.png" });

        }
    })
}

//Listen for click events ion browserAction 
browser.browserAction.onClicked.addListener(updateLocalStorage);

//On extension loading, update localStorage
updateLocalStorage()
