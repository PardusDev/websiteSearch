var Items;
var addWebsiteButton = document.getElementById("addNewWebsite");

addWebsiteButton.addEventListener("click", () => {
    var uniqueID = document.getElementById("InputWebsiteID");
    var contextText = document.getElementById("InputContextText");
    var websiteAddress = document.getElementById("InputWebsiteAddress");


    chrome.storage.local.get("webSites", (results) => {
        Items = results.webSites;

        var willAdd = {
            "id": uniqueID.value,
            "title" : contextText.value,
            "type" : "normal",
            "contexts" : ["selection"],
            "websiteAddress" : websiteAddress.value
        };

        Items.push(willAdd);
        chrome.storage.local.set({ webSites: Items }, function () {});

        chrome.runtime.sendMessage({type: "add",newItem: willAdd}, function() {});
    });
    var tempItem = {
        id: uniqueID.value,
        title: contextText.value,
        type: "normal",
        contexts: ["selection"]
    }

    chrome.contextMenus.create(tempItem);

    location.replace("options.html");
});