var Items;
var deleteWebsiteButton = document.getElementById("deleteWebsite");
var cancelButton = document.getElementById("cancelButton");
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

deleteWebsiteButton.addEventListener("click", () => {
    chrome.storage.local.get("webSites", (results) => {
        Items = results.webSites;
        Items.forEach(function(Item) {
            if (Item.id===id) {
                var index = Items.indexOf(Item);
                Items.slice(index, 1);

                chrome.storage.local.set({ webSites: Items }, function () {});

                chrome.runtime.sendMessage({type: "delete", id: id}, function() {});

                chrome.contextMenus.remove(Item.id);

                location.replace("options.html");
                return;
            }
        });
    });
});