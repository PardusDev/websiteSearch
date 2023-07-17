var Items;
var saveWebsiteButton = document.getElementById("saveWebsite");
var uniqueID = document.getElementById("InputWebsiteID");
var contextText = document.getElementById("InputContextText");
var websiteAddress = document.getElementById("InputWebsiteAddress");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')


chrome.storage.local.get("webSites", (results) => {
    results.webSites.forEach(function(Item) {
        if (Item.id===id) {
            uniqueID.value = Item.id;
            contextText.value = Item.title;
            websiteAddress.value = Item.websiteAddress;
            return;
        }
    });
});

saveWebsiteButton.addEventListener("click", () => {
    chrome.storage.local.get("webSites", (results) => {
        Items = results.webSites;
        Items.forEach(function(Item) {
            if (Item.id===id) {
                Item.title = contextText.value;
                Item.websiteAddress = websiteAddress.value;

                chrome.storage.local.set({ webSites: Items }, function () {});

                // TODO: We need to change the websiteAddress in the Items variable in the background.js file.
                chrome.runtime.sendMessage({newItem: willAdd}, function() {});

                chrome.contextMenus.update(
                    Item.id,
                    {
                        "title" : contextText.value,
                    }
                );
                return;
            }
        });
    });
});