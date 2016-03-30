var cards = [];
$(function(){
	if(window.location.href == "https://pucatrade.com/trades/active"){
		console.log("Window Location: GOOD");
		$('table tr').each(function(){
			if ($(this).contents().find('td').text() == "Shipped"){
				var tradeNumber = $(this).children(":first-child").text().trim();
				var cardSet = $(this).children(":nth-child(2)").children(":first-child").attr("title");
				var cardName = $(this).children(":nth-child(3)").children(":first-child").children(":first-child").children("a:first-child").text();
				var isFoil = ($(this).children(":nth-child(6)").children("img").attr("src") == "/images/icons/card-foil.png" ? "FOIL" : "N/A");
				var address = $(this).children(".receiver").find("a.trader div.userAddress div.address_text").html();
				var indexAddress = getIndexOfK(cards, address);
				if (indexAddress && indexAddress[0] >= 0) {
					console.log("address exists, adding new card");
					cards[indexAddress[0]][1].push([tradeNumber, cardSet, cardName, isFoil]);
				} else {
					cards.push([address, [[tradeNumber, cardSet, cardName, isFoil]]]);
				}
			}
		});
		var textDocument = "";
		$.each(cards, function(index, value){
			textDocument += value[0] + "<br><br>";
			$.each(value[1], function(indexTwo, valueTwo) {
				textDocument += " | " + valueTwo[0] + " | " + valueTwo[1] + " | " + valueTwo[2] + " | " + valueTwo[3] + " |<br>";
			});
			textDocument += "<br><br><br>"
		});
		var wdw = window.open("about:blank", "", "_blank");
		wdw.document.write(textDocument);
	} else {
		window.location.href = "https://pucatrade.com/trades/active";
		alert("rerun the script.");
	}
});


// Du D.
// http://stackoverflow.com/a/16102526
function getIndexOfK(arr, k){
    for(var i=0; i<arr.length; i++){
        var index = arr[i].indexOf(k);
        if (index > -1){
            return [i, index];
        }
    }
}
