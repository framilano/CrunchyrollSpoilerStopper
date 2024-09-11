
// Hides titles
function hide_titles() {
    titles = document.querySelectorAll(`
    [class^="playable-card__title-link"],[class*=" playable-card__title-link"],
    [class^="playable-card-mini-static__title-link"],[class*=" playable-card-mini-static__title-link"]
    `);
    titles.forEach(el => {
        text_pieces = el.innerText.split(' ')
        if (text_pieces[1] == undefined || text_pieces[1] == 'undefined' || text_pieces[1] == '-')
            el.innerText = text_pieces[0]
        else 
            el.innerText = text_pieces[0] + ' ' + text_pieces[1]
    });
}

// When mutations on DOM are observed, useful when loading new divs containing classes to hide
const title_callback = (mutationList, title_observer) => {
    for (const mutation of mutationList) {
        if (mutation.target.className == undefined) continue;
        if(mutation.target.className.includes("playable-thumbnail")) continue;
        if(mutation.target.className.includes("playable-card__title-link")) continue;
        if(mutation.target.className.includes("playable-card-mini-static__title-link")) continue;

        hide_titles();
    }
};

// Whenever the setting has changed (someone clicked on the action icon) shows or hides thumbnails
chrome.storage.local.onChanged.addListener(async (_changes) => {
    let hide_titles_value = await chrome.storage.local.get("hide_titles")

    if (!hide_titles_value["hide_titles"]) {
        title_observer.disconnect()
        location.reload(); 
    } else {
        title_observer.observe(document,title_config);
        hide_titles()
    }
})


// Options for the observer (which mutations to observe)
const title_config = { attributes: true, childList: true, subtree: true };

// Create an observer instance linked to the callback function
title_observer = new MutationObserver(title_callback);

// Retrieving status from local storage when loading the site
gettingStoredSettings = chrome.storage.local.get();
gettingStoredSettings.then((settings) => {
    if (settings.hide_titles == null || settings.hide_titles == undefined) {
        title_observer.observe(document,title_config);
    }

    if (settings.hide_titles == true) title_observer.observe(document, title_config);

    if (settings.hide_titles == false) title_observer.disconnect()

}, () => alert("ERROR"));