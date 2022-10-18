star = 0;
id_product = 0;
// localStorage.clear();
function getParams(url){
	var vt = url.indexOf("?");
	params = {};
	if(vt != -1){
		pr = url.slice(url.indexOf("?")+1, url.length);
		pr = pr.split("&");

		for(var i = 0; i<pr.length; i++){
			sp = pr[i].split("=");
			if(sp.length == 2)
				params[sp[0]] = sp[1];
		}
	}
	console.log(params);
	return params;
}

function render_product(product){
	document.title = product["name"];
	$('.breadcrumb > .active').text(product["name"]);
	$('.phone-name').text(product["name"]);
	img_product = $('img.img-product');
	img_product.attr("src", IMAGE_PATH+product["image"]);

	title_product = $('.section-title > .product-name');
	title_product.text(product["name"]);

	price_product = $('.section-title .price > span');
	price_product.text(currency_format(product["price"]));

	// console.log(product["promotion"]);
	if(product["promotion"].length == 0)
		$(".section-promotion").hide();
	else{
		html = "";
		for(var i =0; i<product["promotion"].length; i++){
			html += '<li>'+product["promotion"][i]+'</li>\n';
		}
		$(".section-promotion > ul").html(html);
	}
	
}


function huuich(){
	var item = $(this).find("i");
	// console.log(item);
	if($(this).attr("data-active") == 0){
		$(item[0]).removeClass("active");	
		$(item[1]).addClass("active");
		$(this).attr("data-active", "1");
	}else{
		$(item[0]).addClass("active");	
		$(item[1]).removeClass("active");	
		$(this).attr("data-active", "0");
	}
}

$(".btn-huuich").click(huuich);

function thaoluan(){
	list_reply = $(".reply");
	list_reply.hide();
	btn_thaoluan = $(".btn-thaoluan");
	for(var i =0; i<list_reply.length; i++){
		if(btn_thaoluan[i] != this)
			$(btn_thaoluan[i]).attr("data-active", "0");
	}

	if($(this).attr("data-active") == 0){
		$(this).parent().parent().find(".reply").show();
		$(this).attr("data-active", "1");
	}else{
		$(this).parent().parent().find(".reply").hide();
		$(this).attr("data-active", "0");
	}
}

$(".btn-thaoluan").click(thaoluan);

function reply(){
	sec_comment = $(this).parent();
	sec_reply = $(sec_comment).parent().find("ul");
	// console.log(sec_comment);
	txtComment = $(sec_comment).find("textarea");
	// console.log(txtComment);
	if($(txtComment).val() != ""){
		html =   '<li>'
				+'	<h6> Khách </h6>'
				+'	<p>'+ $(txtComment).val() +'</p>'
				+'	<div>'
				+'		<a class="btn-huuich" style="color: #ed3237;margin-right: 10px" data-active="0"><i class="far fa-thumbs-up active"></i> <i class="fas fa-thumbs-up"></i> Hữu ích</a>'
				+'		<p>1 giây trước</p>'
				+'	</div>'
				+'</li>';
		sec_reply.append(html);

		btn_huuich = sec_reply.find(".btn-huuich");
		btn_huuich[btn_huuich.length-1].addEventListener("click", huuich);
		$(txtComment).val("");
	}
}

$(".btn-reply").click(reply);

function notification(title, message, type){
	// obj = ".alert-"+type;
	// $(obj).find("strong").text(title);
	// $(obj).find("span").text(message);
	// $(obj).show();
	var c = $('.sec-notification').find("div").length;
	html = '<div class="alert-'+c+' alert alert-'+type+' alert-dismissible fade show" role="alert">'
			+'	<strong>'+title+'</strong> <span>'+message+'</span>'
			+'	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
			+'</div>';

	$('.sec-notification').prepend(html);
	setTimeout(function(){
		$('.alert-'+c).remove();
	}, 3000);
}

$(".btn-comment").click(function(){
	if(star == 0){
		notification("Thông báo!", "vui lòng đánh giá trước", "warning");
		// alert("vui lòng đánh giá trước");
		return;
	}

	sec_comment = $(this).parent().parent();
	list_comment = $(".section-comment");
	// console.log(sec_comment);
	txtComment = $(sec_comment).find("textarea");
	if($(txtComment).val() == ""){
		notification("Thông báo!", "vui lòng nhập nội dung", "warning");
		return;
	}
	html = '<div class="comment">'
			+'	<h5> Khách </h5>'
			+'	<div class="star-vote" data-star="2">'
			+'		<div class="section-review">'
			+'			'+ renderStar(star)
			+'		</div>'
			+'	</div>'
			+'	<p>'+ $(txtComment).val() +'</p>'
			+'	<div class="">'
			+'		<a class="btn-thaoluan" style="color: #ed3237;margin-right: 10px" data-active="0">Thảo luận</a>'
			+'		<a class="btn-huuich" style="color: #ed3237;margin-right: 10px" data-active="0"><i class="far fa-thumbs-up active"></i> <i class="fas fa-thumbs-up"></i> Hữu ích</a>'
			+'		<p>1 giây trước</p>'
			+'	</div>'
			+'	<div class="reply">'
			+'		<ul>'
						
			+'		</ul>'
			+'		<div class="add-comment">'
			+'			<textarea class="col-xl-6 col-sm-6 col-12" name="content"></textarea>'
			+'			<button class="btn btn-primary btn-reply">Gửi</button>'
			+'		</div>';
			+'	</div>'
			+'</div>';
	list_comment.append(html);
	btn_thaoluan = $(".btn-thaoluan");

	btn_thaoluan[btn_thaoluan.length-1].addEventListener("click", thaoluan);
	
	btn_reply = $(".btn-reply");
	btn_reply[btn_reply.length-1].addEventListener("click", reply);
	// console.log(btn_reply[btn_reply.length-1]);

	btn_huuich = $(".btn-huuich");
	btn_huuich[btn_huuich.length-1].addEventListener("click", huuich);
		
	$(txtComment).val("");
});

function renderStar(star){
	html = "";
	for(var i=0; i<5; i++){
		if(i < star)
			html += '<i class="fas fa-star" style="color: #fd9727"></i>\n';
		else
			html += '<i class="fas fa-star"style="color: #9a9898"></i>\n';
	}
	return html;
}

$(".btn-star").click(function(){
	if(star != 0)
		return;

	btn_star = $(".btn-star");
	// console.log(btn_star);
	var flag = false;
	for(var i=0; i<btn_star.length; i++){
		$(btn_star[i]).find("i").css("color", "#9a9898");
	}

	for(var i=0; i<btn_star.length; i++){
		if(btn_star[i] == this){
			flag = true;
			$(".btn-vote").attr("data-star", $(btn_star[i]).attr("data-star"));
		}

		if(flag){
			$(btn_star[i]).find("i").css("color", "#fd9727");
		}
	}

});

$(".btn-vote").click(function(){
	star = Number($(this).attr("data-star"));
	if(star != 0){
		$(this).text("Đã gửi đánh giá");
		$(this).attr("disabled", "disabled");

		count_review = $(".count-review")[5-star];
		$(count_review).text(String(Number($(count_review).text())+1));
	}
});

$(".btn-color").click(function(){
	var btn_color = $(".btn-color");
	// console.log(btn_color);
	for(var i=0; i<btn_color.length; i++){
		// console.log(btn_color[i]);
		$(btn_color[i]).parent().removeClass("active");	
	}
	
	$(this).parent().addClass("active");
	// $(this).css("border")
	// this.
});

$('.btn-mua').click(function(){
	
	add_cart();
	window.location.href = "dathang.html";
});


$('.btn-add-cart').click(function(){
	
	add_cart();
	// console.log(JSON.parse(localStorage["cart"]));
	notification("Thông báo!", "đã thêm vào giỏ hàng", "success");
});

function add_cart(){
	var cart;
	try{
		cart = JSON.parse(localStorage["cart"]);
	}catch{
		cart = new Array();
	}
	count = $('.count_buy').text();
	color = $('.section-color.active').attr("data-color");
	// console.log(color, count);
	for(var i =0; i<cart.length; i++){
		if(cart[i]["id"] == String(id_product)){
			cart[i]["count"] = count;
			cart[i]["color"] = color;
			localStorage["cart"] = JSON.stringify(cart);
			return false;
		}
	}
	cart.push({"id": id_product, "color": color, "count": count});
	localStorage["cart"] = JSON.stringify(cart);
	return true;
}