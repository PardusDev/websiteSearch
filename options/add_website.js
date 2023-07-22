var Items;
var addWebsiteButton = document.getElementById("addNewWebsite");
var cancelButton = document.getElementById("cancelButton");

addWebsiteButton.addEventListener("click", () => {
    var uniqueID = document.getElementById("InputWebsiteID");
    var contextText = document.getElementById("InputContextText");
    var websiteAddress = document.getElementById("InputWebsiteAddress");
    var isProblem = false;

    console.log(isIDValid(uniqueID.value, 3));
    if (!isIDValid(uniqueID.value, 3)) {
        isProblem = true;
        alert("The ID contains unwanted characters or is too short.");
    }



    chrome.storage.local.get("webSites", (results) => {
        Items = results.webSites;

        results.webSites.forEach(function (Item) {
            if(Item.id === uniqueID.value)
            {
                alert("There is another website with the same ID.");
                isProblem = true;
                return;
            }
        });


        if (!isProblem) {
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
        }

    });

    if (!isProblem) {
        var tempItem = {
            id: uniqueID.value,
            title: contextText.value,
            type: "normal",
            contexts: ["selection"]
        }

        chrome.contextMenus.create(tempItem);

        location.replace("options.html");
    }
});

cancelButton.addEventListener("click", () => {
    location.replace("options.html");
})

const isIDValid = (string, minLength) => {
    return !(string !== string.trim()) && string && /^[a-zA-Z-]+$/.test(string) && string.length > minLength
}
