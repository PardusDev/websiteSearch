chrome.runtime.onInstalled.addListener(function(info, tab) {
	fetch('https://pardusdev.github.io/extension/contextItems.json')
		.then(response => response.json())
		.then(Items  => {
			Items.forEach(function(Item) {
				chrome.contextMenus.create(Item);
			});
		})
		.catch(error => {
			//console.error('Error: ', error);
		});
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	var url = "https://google.com.tr";
	if (info.menuItemId === "search-with-epey") {
		url = "https://google.com.tr/search?q=" + info.selectionText + "%20site:epey.com&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:contextualSearchVersion}ie={inputEncoding}"
	} else if (info.menuItemId === "search-with-bokyeme") {
		url = "https://google.com.tr/search?q=" + info.selectionText + "%20site:bokyeme.com&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:contextualSearchVersion}ie={inputEncoding}"
	};
	chrome.tabs.create({ url: url, });
});


