

function renderData(){
	var cart = get_cart();
	if(cart.length == 0){
		window.location.href = "index.html";
	}
	$('.gender').text(localStorage["gender"]);
	$('.fullname').text(localStorage["name"]);
	$('.address').text(localStorage["address"]);
	$('.phone').text(localStorage["phone"]);
	$('.method-delivery').text(localStorage["method-delivery"]);
	$('.method-pay').text(localStorage["method-pay"]);
	$('.other').text(localStorage["other"]);
	cal_total();

	var html = "";
	for(var i =0; i<cart.length; i++){
		product = get_product(cart[i]["id"]);
		html += '<div class="item row">'
				+'	<div class="col-xl-2 col-lg-2 col-sm-3 col-3">'
				+'		<img src="'+IMAGE_PATH + product["image"]+'">'
				+'	</div>'
				+'	<div class="col-xl-7 col-lg-7 col-sm-5 col-5">'
				+'		<h5>'+product["name"]+'</h5>'
				+'		<p>Màu: '+cart[i]["color"]+'</p>'
				+'	</div>'
				+'	<div class="col-xl-3 col-lg-3 col-sm-4 col-4">'
				+'		<p class="price" style="text-align: right">'+currency_format(product["price"])+'<sup>đ</sup></p>'
				+'		<p style="text-align: right">Số lượng: '+cart[i]["count"]+'</p>'
				+'	</div>'
				+'</div>';
	}

	$(".list-product").append(html);
	localStorage["cart"] = new Array();
	// console.log(localStorage["cart"]);
}