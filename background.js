chrome.contextMenus.onClicked.addListener(function(info, tab) {
	var url = "https://google.com.tr";
	if (info.menuItemId === "search-with-epey") {
		var url = "https://google.com.tr/search?q=" + info.selectionText + "%20site:epey.com&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:contextualSearchVersion}ie={inputEncoding}"
	} else if (info.menuItemId === "search-with-bokyeme") {
		var url = "https://google.com.tr/search?q=" + info.selectionText + "%20site:bokyeme.com&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:contextualSearchVersion}ie={inputEncoding}"	
	};
	chrome.tabs.create({ url: url, });
});


chrome.contextMenus.create({
  "id": "search-with-epey",
  "title" : "Epey'de Ara",
  "type" : "normal",
  "contexts" : ["selection"],
});

chrome.contextMenus.create({
  "id": "search-with-bokyeme",
  "title" : "BokYeme'de Ara",
  "type" : "normal",
  "contexts" : ["selection"],
});