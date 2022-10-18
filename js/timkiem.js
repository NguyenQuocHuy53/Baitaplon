function search(){
	var c = 0;
	var keyword = localStorage["search"].toLowerCase();
	if(keyword == ""){
		$('.hetSp').show();
		return;
	}
	$('.keyword').text(keyword);
	var html = '';
	for(var i =0; i<data.length; i++){
		// tìm kiếm chuỗi
		if(data[i]["name"].toLowerCase().indexOf(keyword) != -1 && data[i]["type"] != "other"){
			html += product_html(data[i]);
			c++;
		}
	}
	$('.list-product').html(html);
	if(c == 0){
		$('.hetSp').show();
	}
}