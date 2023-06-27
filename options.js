let Items;

chrome.storage.local.get("webSites", (results) => {
    Items = results.webSites;
    console.log(Items);

    Items.forEach(function(Item) {
        var dom = `
            <tr id="${Item.id}">
                <td>${Item.title}</td>
                <td>${Item.websiteAddress}</td>
                <td><i class="bi bi-trash-fill"></i></td>
                <td><i class="bi bi-pencil-fill"></i></td>
            </tr>
        `
        const table = document.getElementById("websitesTableBody");

        table.innerHTML += dom;
    });
});