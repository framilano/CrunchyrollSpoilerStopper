
// Hides thumbnails
function hide_thumbnails() {
    thumbnails = document.querySelectorAll('[class^="playable-thumbnail"],[class*=" playable-thumbnail"]');
    thumbnails.forEach(el => {
        el.style.display = "none"
        //el.style.visibility = "hidden";
    });
}

// Shows thumbnails
function show_thumbnails() {
    thumbnails = document.querySelectorAll('[class^="playable-thumbnail"],[class*=" playable-thumbnail"]');
    thumbnails.forEach(el => {
        el.style.display = "block"
        //el.style.visibility = "visible";
    });
}

// When mutations on DOM are observed, useful when loading new divs containing classes to hide
const thumb_callback = (mutationList, thumb_observer) => {
    for (const mutation of mutationList) {
        if (mutation.target.className == undefined) continue;
        if(mutation.target.className.includes("playable-thumbnail")) continue;
        if(mutation.target.className.includes("playable-card__title-link")) continue;
        if(mutation.target.className.includes("playable-card-mini-static__title-link")) continue;
        
        hide_thumbnails();
    }
};

// Whenever the setting has changed (someone clicked on the action icon) shows or hides thumbnails
chrome.storage.local.onChanged.addListener(async (_changes) => {
    let hide_thumbs = await chrome.storage.local.get("hide_thumbs")

    if (!hide_thumbs["hide_thumbs"]) {
        thumb_observer.disconnect()
        show_thumbnails()
    } else {
        thumb_observer.observe(document,thumb_config);
        hide_thumbnails()
    }
})


// Options for the observer (which mutations to observe)
const thumb_config = { attributes: true, childList: true, subtree: true };

// Create an observer instance linked to the callback function
thumb_observer = new MutationObserver(thumb_callback);

// Retrieving status from local storage when loading the site
gettingStoredSettings = chrome.storage.local.get();
gettingStoredSettings.then((settings) => {
    if (settings.hide_thumbs == null || settings.hide_thumbs == undefined) {
        thumb_observer.observe(document,thumb_config);
    }

    if (settings.hide_thumbs == true) thumb_observer.observe(document, thumb_config);

    if (settings.hide_thumbs == false) thumb_observer.disconnect()

}, () => alert("ERROR"));


