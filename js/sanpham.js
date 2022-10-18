

$('.sort').click(function(){
	var type = $(this).attr('data-sort');

	
	if(type == "desc"){
		sort(false);
	}else if(type == "insc"){
		sort(true);
	}
});

function sort(isInsc){
	var list_product = $(document.querySelector(".product.active")).find('.item-product');
	for(var i=0; i<list_product.length-1; i++){
		for(var j=i+1; j<list_product.length; j++){
			
			var price_i = Number($(list_product[i]).attr('data-price'));
			var price_j = Number($(list_product[j]).attr('data-price'));
			// console.log(price_i, price_j);
			
			if(price_j < price_i == isInsc){
				swap(list_product[i], list_product[j]);
				console.log(list_product[i], list_product[j]);
				list_product = $(document.querySelector(".product.active")).find('.item-product');
				// console.log("s", price_i, price_j);
			}
			// if(j==4)break;
		}
		// if(i == 0)break;
	}
	var price_i = Number($(list_product[list_product.length-2]).attr('data-price'));
	var price_j = Number($(list_product[list_product.length-1]).attr('data-price'));
	console.log(price_i, price_j);
	if(price_j < price_i == isInsc){
		$(list_product[list_product.length-2]).insertAfter(list_product[list_product.length-1]);
	}
}

function swap(elm_a, elm_b){
	var before = $(elm_b).prev();
	$(elm_b).insertAfter($(elm_a));
	$(elm_a).insertAfter(before);
}

$('.filter-price').click(function(){
	var start = Number($(this).attr("data-start"));
	var end = Number($(this).attr("data-end"));
	var list_product = $('.product.active .item-product');
	for(var i = 0; i<list_product.length; i++)
		$(list_product[i]).hide();
	// $(".space").hide();
	$(".product.active .hetSp").hide();
	var c = 0;
	for(var i = 0; i<list_product.length; i++){
		var price = Number($(list_product[i]).attr('data-price'));
		// if(end - start == 1000000000)
		// 	$(".space").show();
		if(start <= price && price < end){
			$(list_product[i]).show();
			c++;
		}
	}
	if(c == 0){
		$(".product.active .hetSp").show();
	}
	
});

// function ()