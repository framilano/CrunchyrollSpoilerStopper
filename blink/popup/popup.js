const titles_box = document.getElementById("hide_titles")
const thumbs_box = document.getElementById("hide_thumbs")

titles_box.addEventListener('change', () => {
    chrome.storage.local.set(
        { 
            changed: "titles",
            hide_thumbs: thumbs_box.checked,
            hide_titles: titles_box.checked
        }
    )
})
thumbs_box.addEventListener('change', () => {
    chrome.storage.local.set(
        { 
            changed: "thumbs",
            hide_thumbs: thumbs_box.checked,
            hide_titles: titles_box.checked
        }
    )
})

function loadSavedSettings() {
    gettingStoredSettings = chrome.storage.local.get();
    gettingStoredSettings.then((settings) => {
        if (settings == null || settings == undefined) {
            chrome.storage.local.set(
                { 
                    hide_thumbs: true,
                    hide_titles: true
                }
            )
            thumbs_box.checked = true
            titles_box.checked = true
        }
        thumbs_box.checked = settings.hide_thumbs
        titles_box.checked = settings.hide_titles
    })

}

loadSavedSettings()