let Items;

chrome.runtime.onInstalled.addListener(function(info, tab) {
	fetch('https://pardusdev.github.io/extension/contextItems.json')
		.then(response => response.json())
		.then(_Items  => {
			Items = _Items;
			Items.forEach(function(Item) {
				var tempItem = {
					id: Item.id,
					title: Item.title,
					type: Item.type,
					contexts: Item.contexts
				}
				chrome.contextMenus.create(tempItem);
			});
			chrome.storage.local.set({ webSites: Items }, function () {});
		})
		.catch(error => {
			console.error('Error: ', error);
		});
})


chrome.contextMenus.onClicked.addListener(function(info, tab) {
	var url = "https://google.com.tr/search?q=" + info.selectionText + "%20site:"+ getWebsiteAddressById(info.menuItemId);
	chrome.tabs.create({ url: url, });
});

function getWebsiteAddressById(id) {
	let Item = Items.find(item => item.id === id);
	return Item.websiteAddress;
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.type === "update") {
			Items.forEach(function(Item) {
				if (Item.id === request.newItem.id) {
					Item.title = request.newItem.title;
					Item.websiteAddress = request.newItem.websiteAddress;
					return;
				}
			});
		} else if (request.type === "add") {
			Items.push(request.newItem);
		}
		sendResponse({status: 'ok'});
	}
);