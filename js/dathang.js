function renderData(){
	var cart = get_cart();
	

	var list_product = $(".product-info");
	var html = "";
	for(var i =0; i<cart.length; i++){
		product = get_product(cart[i]["id"]);
		html += '<div class="row" data-id='+cart[i]["id"]+'>'
				+'	<div class="col-xl-2 col-sm-3 col-3" style="text-align: center;">'
				+'		<img src="'+IMAGE_PATH + product["image"]+'">'
				+'		<a class="btn-xoa"><i class="far fa-trash-alt"></i> Xóa</a>'
				+'	</div>'
				+'	<div class="col-xl-10 col-sm-9 col-9">'
				+'		<h5>'+product["name"]+'</h5>'
				+'		<p class="price">'+currency_format(product["price"])+'<sup>đ</sup></p>'
				+'		<p>Màu: '+ selectColor(cart[i]["color"]) +'</p>'
				+'		<div class="section-quantity">'
				+'			<a class="btn-decrease">-</a>'
				+'			<span>'+cart[i]["count"]+'</span>'
				+'			<a class="btn-increase">+</a>'
				+'		</div>'
				+'	</div>'
				+'</div>';
	}
	$(".product-info").append(html);
	cal_total();

	if(localStorage["login"] == 1){
		$('[name=phone]').attr('disabled', 'disabled');
		$('[name=phone]').val(localStorage["phone"]);
		// $('[name=gender]').val(localStorage["gender"]);
		$('[name=fullname]').val(localStorage["name"]);
		$('[name=address]').val(localStorage["address"]);
		console.log(localStorage["gender"]);
		if(localStorage["gender"] == "Chị"){
			$('[value=Chị]').attr('checked', 'checked');
		}

	}
	var btn_xoa = $(".btn-xoa");
	var dec = $(".btn-decrease");
	var inc = $(".btn-increase");
	var sl_color = $(".sl-color");
	for(var i =0; i<dec.length; i++){
		btn_xoa[i].addEventListener("click", xoa);
		dec[i].addEventListener("click", function(){
			sec_quantity = $(this).parent();
			txtNumber = $(sec_quantity).find("span");
			if(txtNumber.text() <= 1){
				return;
			}
			$(txtNumber).text(Number($(txtNumber).text())-1);

			var id = $(this).parent().parent().parent().attr("data-id");
			var count = $(this).parent().find("span").text();
			var color = $(this).parent().parent().find("p > select").val();
			console.log(id, count, color);
			update_cart(id, count, color);
			// console.log(JSON.parse(localStorage["cart"]));
			cal_total();
		});
		inc[i].addEventListener("click", function(){
			sec_quantity = $(this).parent();
			txtNumber = $(sec_quantity).find("span");
			$(txtNumber).text(Number($(txtNumber).text())+1);

			var id = $(this).parent().parent().parent().attr("data-id");
			var count = $(this).parent().find("span").text();
			var color = $(this).parent().parent().find("p > select").val();
			console.log(id, count, color);
			update_cart(id, count, color);
			// console.log(JSON.parse(localStorage["cart"]));
			cal_total();
		});

		sl_color[i].addEventListener("change", function(){
			var id = $(this).parent().parent().parent().attr("data-id");
			var count = $(this).parent().parent().find("span").text();
			var color = $(this).val();;
			// console.log(id, count, color);
			update_cart(id, count, color);
		});
	}	
}

function selectColor(color){
	html =	'<select class="form-select form-select-sm sl-color" aria-label=".form-select-sm example">\n';
	arr_color = ["Xanh dương", "Xanh lá", "Đen", "Trắng", "Đỏ"];
	for(var i =0; i<arr_color.length; i++){
		if(arr_color[i] == color){
			html += '<option value="'+arr_color[i]+'" selected>'+arr_color[i]+'</option>\n';
		}else{
			html += '<option value="'+arr_color[i]+'">'+arr_color[i]+'</option>\n';
		}
	}
	html += '</select>';
	return html;
}

function xoa(){
	var pd = $(this).parent().parent();
	var id = $(pd).attr("data-id");
	remove_product(id);
	$(pd).remove();
	cal_total();
}

$("[name=fullname]").blur(check_fullname);

$("[name=phone]").blur(check_phone);

$("[name=address]").blur(check_diachi);

$("[name=fullname], [name=phone], [name=address]").focus(function(){
	$(this).parent().find("div").text("");
});

$('.btn-dathang').click(function(){
	var gender = $("[name=gender]:checked").val();
	var fullname = $("[name=fullname]").val();
	var phone = $("[name=phone]").val();
	var address = $("[name=address]").val();
	var other = $("[name=other]").val();
	var method_delivery = $("[name=method-delivery]:checked").val();
	var method_pay = $("[name=method-pay]:checked").val();
	if(!check_fullname() || !check_phone() || !check_diachi()){
		return;
	}

	// lưu thông tin đơn hàng
	localStorage["gender"] = gender;
	localStorage["name"] = fullname;
	localStorage["phone"] = phone;
	localStorage["address"] = address;
	localStorage["method-delivery"] = method_delivery;
	localStorage["method-pay"] = method_pay;
	localStorage["other"] = other;

	// lưu thông tin cá nhân
	var account_list;
	try{
		account_list = JSON.parse(localStorage["account"]);
	}catch{
		account_list = new Array();
	}
	if(localStorage["login"] == 1){
		
		for(var i =0; i<account_list.length; i++){
			if(account_list[i]["phone"] == localStorage["phone"]){
				account_list[i]["gender"] = gender;
				account_list[i]["name"] = fullname;
				account_list[i]["address"] = address;
				localStorage["account"] = JSON.stringify(account_list);
				break;
			}
		}
	}else{
		account_list.push({"phone": phone, "pass": "", "name": fullname, "address": address, "gender": gender});
		localStorage["account"] = JSON.stringify(account_list);
	}
	window.location.href = "done.html";
});