var Items;
var addWebsiteButton = document.getElementById("addNewWebsite");

addWebsiteButton.addEventListener("click", () => {
    var uniqueID = document.getElementById("InputWebsiteID").value;
    var contextText = document.getElementById("InputContextText").value;
    var websiteAddress = document.getElementById("InputWebsiteAddress").value;


    chrome.storage.local.get("webSites", (results) => {
        Items = results.webSites;

        var willAdd = {
            "id": uniqueID,
            "title" : contextText,
            "type" : "normal",
            "contexts" : ["selection"],
            "websiteAddress" : websiteAddress
        };

        Items.push(willAdd);
        chrome.storage.local.set({ webSites: Items }, function () {});

        chrome.runtime.sendMessage({newItem: willAdd}, function() {});
    });
    var tempItem = {
        id: uniqueID,
        title: contextText,
        type: "normal",
        contexts: ["selection"]
    }
    chrome.contextMenus.create(tempItem);
});