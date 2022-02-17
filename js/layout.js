
/* 드롭다운 페이드인 */
jQuery('.dropdown').on('show.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});

jQuery('.dropdown').on('hide.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});

jQuery('.btn-group').on('show.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});

jQuery('.btn-group').on('hide.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});
/* 드롭다운 페이드인 End */

/* 문단 왼쪽에 접힘 여부를 알려주는 화살표 추가 */
$(".wiki-heading").each(function () {
    // NOTE : 처음 모든 문단을 접는 설정은 리버티 스킨에 없기 때문에 고려하지 않음.
    $(this).prepend('<a class="wiki-heading-arrow"><i class="fa fa-chevron-down"></i></a> ')
        .find(".wiki-heading-arrow")
        .click(function (e) {
            e.preventDefault();
        });
})
$(".wiki-heading").click(function (e) {
    if (e.target.tagName === 'A') return;
    var paragraph = $(this).next();
    if (paragraph.is(':visible')) {
        $(this).find(".wiki-heading-arrow i").addClass("fa-chevron-down").removeClass("fa-chevron-up")
    } else {
        $(this).find(".wiki-heading-arrow i").addClass("fa-chevron-up").removeClass("fa-chevron-down")
    }
});
/* 문단 왼쪽에 접힘 여부를 알려주는 화살표 추가  END*/
//윈도우 사이즈에 따라 변경을 할지 않할 지 체크한다.
var isAllowRequestList = true;
//매개 변수 parent는 ul태그여야 합니다
function ShowAjaxRecentList(parent)
{
	function temp()
	{
		jQuery.ajax(
		{
			url: "/sidebar.json", // 호출 URL
			dataType:'json'
		}
			)
		.done(function(res)
		{
			var html = "";
			for(var i = 0 ; i < res.length && i < 10 ; i++)
			{
				var item = res[i];
        html += '<li><a class="recent-item" href = "/w/' + encodeURIComponent(item.document) + '" title="' + item.document +'">';
				var time = new Date(item.date * 1000);
				var hour = time.getHours();
				var minute = time.getMinutes();
				var second = time.getSeconds();
				if(hour < 10)
				{
					hour = "0" + hour;
				}
				if(minute < 10)
				{
					minute = "0" + minute;
				}
				if(second < 10)
				{
					second = "0" + second;
				}
				time = hour + ":" + minute + ":" + second;

				html += "[" + time + "] ";
				var text = item.document;
				if(text.length > 13)
				{
					text = text.substr(0,13);
					text +="...";
				}
				html += text;
				html += "</a></li>"
			}
			if(parent != null)
			{
				jQuery(parent).html(html);
			}
		});
	}
	temp();
}

/**
 * Vector-specific scripts
 */
var recentIntervalHandle = null;

jQuery( function ( jQuery ) {


	var width = jQuery(window).width();
	if(width > 1023)
	{
		isAllowRequestList = true;
		ShowAjaxRecentList(jQuery("#live-recent-list"));
	}
	else
	{
		isAllowRequestList = false;
	}

	//만약에 화면의 사이즈가 작아 최근 변경글이 안보일 시, 갱신을 하지 않는다.
	jQuery(window).resize(recentIntervalCheck);
} );


var recentIntervalCheck = function(){
	var width = jQuery(window).width();
	if(width <= 1023){
		if(recentIntervalHandle != null){
			clearInterval(recentIntervalHandle);
			recentIntervalHandle = null;
		}
		isAllowRequestList = false;
	}else{
		if(recentIntervalHandle == null){
			recentIntervalHandle = setInterval(function(){
				ShowAjaxRecentList(jQuery("#live-recent-list"));
			},60 * 1000);
		}
		isAllowRequestList = true;
	}
}

jQuery(document).ready(function(jQuery){
	recentIntervalCheck();
});
$(function() {
	var isVideoAvailable = (function(){
		var v = document.createElement('video');
		return v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.4D401E').replace(/no/, '');
	 })();
	$(".wiki-article img.wiki-image-loading").removeClass('wiki-image-loading').each(function () {
		var img = $(this);
		var playAsVideo = img.attr('data-video-src') && isVideoAvailable;
		if(playAsVideo) {
			// senkawa skin 참고함.
			var videoTag = $("<video class='wiki-image' loop autoplay muted playsinline>");
			videoTag.attr('src', img.attr('data-video-src'));
			videoTag.attr('poster', '/skins/liberty/img/loading.gif');
			if(img.attr('width')) videoTag.attr('width', img.attr('width'));
			if(img.attr('height')) videoTag.attr('height', img.attr('height'));
			img.after(videoTag);
			img.remove();
		} else {
			img.attr('src', $(this).attr("data-src"));
		}
	});
	$("#searchform").submit(function() { return false; });
	$("#searchInput").keypress(function (event) {
		if ((event.keyCode ? event.keyCode : event.which) != 13) { return; }
		event.preventDefault();
		var val = $(this).val();
		if (val.length > 0) {
			location.href = "/go/" + encodeURIComponent(val);
		}
	});
	$("#searchInput").autocomplete({
		delay: 100,
		source: function(request, response) {
			$.ajax({
				url: '/complete/' + encodeURIComponent(request.term),
				dataType : 'json',
				success: function(data) {
					response(data);
				},
				error: function(data) {
					response([]);
				}
			});
		},
		select: function(event, ui) {
			if(ui.item.value) {
				location.href = "/w/" + encodeURIComponent(ui.item.value);
			}
		}
	});
	$("#searchSearchButton").click(function () {
		var val = $("#searchInput").val();
		if (val.length > 0) {
			location.href = "/search/" + encodeURIComponent(val);
		}
	});
	$("#searchGoButton").click(function () {
		var val = $("#searchInput").val();
		if (val.length > 0) {
			location.href = "/w/" + encodeURIComponent(val);
		}
	});

$(".wiki-fn-content").click(function(){
    var target=$(this).attr('href');
    target=target.replace("#","");
    var $tmp=$("span[class=target][id=\""+ target+"\"]").parent().clone();
    $tmp.children("span[class=target]").remove();
    $tmp.children("a[href^='#rfn-']").remove();
    $("#footnoteModal .modal-header").html("<h5 class=\"modal-title\">각주: "+ $(this).text()+"</h5>");
    $("#footnoteModal .modal-body").html($tmp.html());$("#footnoteModal").modal('show');
    return false;
});
});