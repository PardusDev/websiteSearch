let Items;
var addButton = document.getElementById("addWebSite");

chrome.storage.local.get("webSites", (results) => {
    Items = results.webSites;

    Items.forEach(function(Item) {
        var dom = `
            <tr id="${Item.id}">
                <td>${Item.title}</td>
                <td>${Item.websiteAddress}</td>
                <td><a href="delete_website.html?id=${Item.id}" id="deleteButton"><i class="bi bi-trash-fill"></i></a></td>
                <td><a href="edit_website.html?id=${Item.id}" id="editButton"><i class="bi bi-pencil-fill"></i></a><td>
            </tr>
        `
        const table = document.getElementById("websitesTableBody");

        table.innerHTML += dom;
    });
});

addButton.addEventListener("click", function () {
    location.replace("add_website.html");
})
