

function slide_khuyenmai(){
	var time = 4000;
	var indx_slide = 0;
	var list_khuyenmai = document.querySelector(".list-khuyenmai");	
	var pre_scl = 0;
	let sl = setInterval(function(){
		var width = $('.slide').css('width');
		width = Number(width.slice(0, -2));
		var scl = list_khuyenmai.scrollLeft;
		list_khuyenmai.scrollTo({
	        left: scl + width/2,
	        behavior: 'smooth'
	    });
	}, time);	
}



function render_khuyenmai(){
	var list_id = [1, 2, 3, 4, 11, 12, 13];
	var html = '';
	for(var i=0; i<list_id.length; i++){

		html += '<div class="slide col-lg-2 col-sm-4 col-6">'
				+'	<a href="chitietsanpham.html?id='+ list_id[i] +'">'
				+'		<img src="'+ IMAGE_PATH+data[list_id[i]-1]["image"] +'">'
				+'	</a>'
				+'	<p><a href="chitietsanpham.html?id='+ list_id[i] +'">'+ data[list_id[i]-1]["name"] +'</a></p>'
				+'	<p>'
				+'		<span class="before-price">'+ currency_format(data[list_id[i]-1]["price"]-1000000) +'<sup>đ</sup></span>'
				+'		<span class="after-price">'+ currency_format(data[list_id[i]-1]["price"]) +'<sup>đ</sup></span>'
				+'	</p>'
				+'</div>';
	}
	$('.list-khuyenmai').html(html);
}