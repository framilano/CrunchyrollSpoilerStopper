
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
const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.attributeName == "style") continue;
        if (mutation.type === 'childList') 
            hide_thumbnails();
    }
};

// Whenever the setting has changed (someone clicked on the browserAction icon) shows or hides thumbnails
browser.storage.local.onChanged.addListener((changes) => {
    if (!changes['status'].newValue) {
        observer.disconnect()
        show_thumbnails()
    }
    else {
        observer.observe(document, config);
        hide_thumbnails()
    }
})


// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Create an observer instance linked to the callback function
observer = new MutationObserver(callback);

// Retrieving status from local storage when loading the site
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then((settings) => {
    if (settings.status == null || settings.status == undefined) {
        browser.storage.local.set({ status: true })
        observer.observe(document, config);
    }

    if (settings.status == true) observer.observe(document, config);

    if (settings.status == false) observer.disconnect()

}, () => alert("ERROR"));


