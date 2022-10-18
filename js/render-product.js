// apple = document.querySelectorAll("div.apple");
product_apple = $("div.apple div.list-product");
product_samsung = $("div.samsung div.list-product");
// product_apple = $("div.apple div.list-product");
// console.log(product_apple);
function render_product(data, type){
	// apple
	html = "";
	for(var i = 0; i < data.length; i++){
		if(data[i]["type"] != type)
			continue;
		if(i%5==0)
			html += space();

		html += product_html(data[i]);

		if((i+1) % 5 == 0)
			html += space();
	}

	if(type == "apple")
		product_apple.html(html);
	else if(type == "samsung")
		product_samsung.html(html);
	// product_apple.innerHTML = html;
	// console.log(product_apple.innerHTML);
}

function space(){
	return '<div class="col-lg-1 space"></div>\n';
}

