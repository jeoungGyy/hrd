$(function(){
	//mainvisual slider function 호출 위치변경
	window['swiperMainKey'] = new Swiper('#mainKeyVisual', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		pagination: {
			el: '.mainkey-page',
			clickable:true
		},
		autoplay: {
			delay: 2500,
		},
		on : {
			slideChangeTransitionEnd : function() {
				// 웹 접근성 aria-hidden 처리
				$('div.mainKeyVisual li').attr("aria-hidden","true");
				$('div.mainKeyVisual li.swiper-slide-active').attr("aria-hidden","false");
			}
		},
		autoplayDisableOninteraction: true //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
	});

	//디지털신기술 훈련과정 슬라이더
	var swiperCnt = $('#disitalTech').find('.swiper-slide').length;
	if ( swiperCnt > 1) {
		window['swiperDisitalTech'] = new Swiper('#disitalTech', {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '#digital-pagination',
				clickable:true,
			},
			on : {
				slideChangeTransitionEnd : function() {
					// 웹 접근성 aria-hidden 처리
					$('div.disitalTech li.swiper-slide').attr("aria-hidden","true");
					var startIdx = 0;
					var maxIdx = $('div.disitalTech li.swiper-slide').length;
					$('div.disitalTech li.swiper-slide').each(function(index){
						if($(this).hasClass("swiper-slide-active")){
							startIdx = index;
							return false;
						}
					});
					for(var n=startIdx; n<startIdx+3; n++){
						if(n < maxIdx) $('div.disitalTech li.swiper-slide').eq(n).attr("aria-hidden","false");
						else $('div.disitalTech li.swiper-slide').eq(n-maxIdx).attr("aria-hidden","false");
					}
				}
			},
			autoplay: {
				delay: 2500,
			},
			autoplayDisableOninteraction: true
		});

		$("#disitalTech > ul").find(".swiper-slide-duplicate").find("a").attr("tabIndex", "-1");
		$("#disitalTech > ul").find("li").find("a").on("focus",function() {
			console.log($(this).parent());
			var slideIndex = $(this).parent().attr("data-swiper-slide-index");
			console.log(slideIndex);
			$("#digital-pagination").parent().find(".movieControlArea").find(".btnGroup").find(".swiper-button-play .pause").trigger('click');
			$($("#digital-pagination").find("span")[slideIndex]).trigger('click');
			$($(this).parent()).removeAttr("tabIndex");
		});
		
		
	}

	//디지털 크레딧 신기술 훈련과정 슬라이더
	var swiperCnt = $('#disitalCredit').find('.swiper-slide').length;
	if ( swiperCnt > 1) {
		window['swiperDisitalCredit'] = new Swiper('#disitalCredit', {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '#digitalCredit-pagination',
				clickable:true,
			},
			on : {
				slideChangeTransitionEnd : function() {
					// 웹 접근성 aria-hidden 처리
					$('div.disitalCredit li.swiper-slide').attr("aria-hidden","true");
					var startIdx = 0;
					var maxIdx = $('div.disitalTech li.swiper-slide').length;
					$('div.disitalCredit li.swiper-slide').each(function(index){
						if($(this).hasClass("swiper-slide-active")){
							startIdx = index;
							return false;
						}
					});
					for(var n=startIdx; n<startIdx+3; n++){
						if(n < maxIdx) $('div.disitalCredit li.swiper-slide').eq(n).attr("aria-hidden","false");
						else $('div.disitalCredit li.swiper-slide').eq(n-maxIdx).attr("aria-hidden","false");
					}
				}
			},
			autoplay: {
				delay: 2500,
			},
			autoplayDisableOninteraction: true
		});
	}
	
	//범부처 디지털 신기술 분야 훈련제도 슬라이더
	var swiperCnt = $('#allDisitalTech').find('.swiper-slide').length;
	if ( swiperCnt > 1) {
		window['swiperAllDisitalTech'] = new Swiper('#allDisitalTech', {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '#allDigital-pagination',
				clickable:true,
			},
			on : {
				slideChangeTransitionEnd : function() {
					// 웹 접근성 aria-hidden 처리
					$('#allDisitalTechArea li.swiper-slide').attr("aria-hidden","true");
					var startIdx = 0;
					var maxIdx = $('#allDisitalTechArea li.swiper-slide').length;
					$('#allDisitalTechArea li.swiper-slide').each(function(index){
						if($(this).hasClass("swiper-slide-active")){
							startIdx = index;
							return false;
						}
					});
					for(var n=startIdx; n<startIdx+3; n++){
						if(n < maxIdx) $('#allDisitalTechArea li.swiper-slide').eq(n).attr("aria-hidden","false");
						else $('#allDisitalTechArea li.swiper-slide').eq(n-maxIdx).attr("aria-hidden","false");
					}
				}
			},
			autoplay: {
				delay: 2500,
		},
			autoplayDisableOninteraction: true
		});

		$("#allDisitalTech > ul").find(".swiper-slide-duplicate").find("a").attr("tabIndex", "-1");
		$("#allDisitalTech > ul").find("li").find("a").on("focus",function() {
			console.log($(this).parent());
			var slideIndex = $(this).parent().attr("data-swiper-slide-index");
			console.log(slideIndex);
			$("#allDigital-pagination").parent().find(".movieControlArea").find(".btnGroup").find(".swiper-button-play .pause").trigger('click');
			$($("#allDigital-pagination").find("span")[slideIndex]).trigger('click');
			$($(this).parent()).removeAttr("tabIndex");
		});
	}
	
	//정부부처별 훈련과정 슬라이더
	var swiperCnt = $('#trainingCourse').find('.swiper-slide').length;
	if ( swiperCnt > 1) {
		window['swiperTrainingCourse'] = new Swiper('#trainingCourse', {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '#trainingCourse-pagination',
				clickable:true,
			},
			on : {
				slideChangeTransitionEnd : function() {
					// 웹 접근성 aria-hidden 처리
					$('#trainingCourseArea li.swiper-slide').attr("aria-hidden","true");
					var startIdx = 0;
					var maxIdx = $('#trainingCourseArea li.swiper-slide').length;
					$('#trainingCourseArea li.swiper-slide').each(function(index){
						if($(this).hasClass("swiper-slide-active")){
							startIdx = index;
							return false;
						}
					});
					for(var n=startIdx; n<startIdx+3; n++){
						if(n < maxIdx) $('#trainingCourseArea li.swiper-slide').eq(n).attr("aria-hidden","false");
						else $('#trainingCourseArea li.swiper-slide').eq(n-maxIdx).attr("aria-hidden","false");
					}
				}
			},
			autoplay: {
				delay: 2500,
			},
			autoplayDisableOninteraction: true
		});
		
		$("#trainingCourse > ul").find(".swiper-slide-duplicate").find("a").attr("tabIndex", "-1");
		$("#trainingCourse > ul").find("li").find("a").on("focus",function() {
			console.log($(this).parent());
			var slideIndex = $(this).parent().attr("data-swiper-slide-index");
			console.log(slideIndex);
			$("#trainingCourse-pagination").parent().find(".movieControlArea").find(".btnGroup").find(".swiper-button-play .pause").trigger('click');
			$($("#trainingCourse-pagination").find("span")[slideIndex]).trigger('click');
			$($(this).parent()).removeAttr("tabIndex");
		});
	}

	uiForm();
	function uiForm(){	

		//라디오버튼
		var radioForm = 'input[type=radio]';
		$(radioForm).each(function () {
			if ($(this).prop('checked') == true) {
				var labelFor = $(this).attr('id');
				$('[for="'+labelFor+'"]').addClass('on');
			}
			if($(this).prop('disabled') == true){
				$(this).parent().addClass('disabled');
			}
		});
	
		$(document).on('click', radioForm, function () {
			var labelFor = $(this).attr('id');
			var n = $(this).attr('name');
			$('[name="' + n + '"]').parent().removeClass('on');
			$('[for="'+labelFor+'"]').addClass('on');
		});
	
		//체크박스 (서비스)
		var checkboxForm = 'input[type=checkbox]';
		$(checkboxForm).each(function () {
			$(this).on('click', function() {
				if ($(this).prop('checked') == true) {
					var labelFor = $(this).attr('id');
					$('[for="'+labelFor+'"]').addClass('on');
				}else{
					$(this).siblings('label').removeClass('on');
				}
			});
	
			//키보드 접근성 추가
			$(this).on('keydown', function(e) {			
				if (e.keyCode == 32) { // space key
					if ($(this).prop('checked') == true) {
						var labelFor = $(this).attr('id');
						$('[for="'+labelFor+'"]').removeClass('on');					
					}else{
						$(this).siblings('label').addClass('on');
					}
				}				
			});
		});	
	
		//textarea_자동 높이 조절
		$("textarea.autosize").on('keydown keyup', function () {
			$(this).height(1).height( $(this).prop('scrollHeight') );	
		});
	}
	

	//로그인 라디오버튼
	$("#radioMemberType input[type='radio']").change(function(){
		if($('#radioMemberType01').is(':checked')){
			$('#memberType01').css('display','block');
			$('#memberType02').css('display','none');
			$('#memberType03').css('display','none');
		}
		else if($('#radioMemberType02').is(':checked')){
			$('#memberType01').css('display','none');
			$('#memberType02').css('display','block');
			$('#memberType03').css('display','none');
		}
		else if($('#radioMemberType03').is(':checked')){
			$('#memberType01').css('display','none');
			$('#memberType02').css('display','none');
			$('#memberType03').css('display','block');
		}	
	});

	$("#radioDeputy input[type='radio']").change(function(){
		if($('#radioDeputy01').is(':checked')){
			$('#deputy01').css('display','block');
			$('#deputy02').css('display','none');
		}
		else if($('#radioDeputy02').is(':checked')){
			$('#deputy01').css('display','none');
			$('#deputy02').css('display','block');
		}
	});
	/* 기관칮기 : 기존 기관찾기 사용
	$('.openMenu_2' ).hide();
	$('.zone').on('click', function () {
	//버튼 색 제거,추가
	$('.zone').removeClass('on');
	$(this).addClass('on');

	//컨텐츠 제거 후 인덱스에 맞는 컨텐츠 노출
	var idx = $('.zone').index(this);

	$('.zoneBox').hide();
	$('.zoneBox').eq(idx).show();
	});*/
	
	$(function(){
		// 팝업 호출
		$('.popactive').click(function(){
			var data = $(this).data('popactive');
			$('body').css('position','fixed');
			$('body').css('height','100%');
			$('.layerfullWrap').css('display','none');
			$('[data-fullpop="'+ data +'"]').css('display','block');
		});
	
		// 팝업 닫기
		$('.layerCloseBtn').click(function(){
			$('body').removeAttr('style');
			$(this).closest('.layerfullWrap').css('display','none');
		});

		// 개별 슬라이드
		$('.dataSlide').on('click', function(){
			var data = $(this).data('slide');
			if ( $('[data-slideEle="'+ data +'"]').css('display') == 'block' )
			{
				$(this).addClass('on');
				
				$('[data-slideEle="'+ data +'"]').stop().slideUp(500);
			} else {
				$(this).removeClass('on');
				$('[data-slideEle="'+ data +'"]').stop().slideDown(500);
			}
		});

	});

	//tooltip show, 10-21 add
	
	$(document).on("click", ".toolTipBtn", function () {
		$('.tmpClose').trigger('click');
		//var tooltipW = $('.toolTipContent').outerWidth();
		window["focusEle1"] = $(":focus");
		
		var tooltipH = $(this).next().outerHeight();
		$(this).next().attr("tabindex","0");
		$(this).next().remove(".tmpClose");
		
//		$(this).next().find('button[title=닫기][class=tmpClose]').remove();
		$(this).next().append("<a href='javascript:void(0);' title='닫기'><img tabindex='0' src='/new_images/common/btnPopupClose.png' alt='닫기' class='tmpClose' style='position:absolute;top:10px;right:10px;'/></a>");
		
		$(this).next().focus();
		//$('#mask').fadeIn();
		$(this).next().toggle().css({
			"background":"white",
			"position": 'fixed',
			"top": '50%',
			"left": 30,
			"z-index": 1001,
			"width": 580,
			"marginLeft": 0,
			"marginTop": -tooltipH/2,//툴팁박스 높이값의 절반
			//"marginTop": 70,
		});
	});
	//tooltip hide, 10-21 add
	$(document).on("click", ".tmpClose", function () {
		$(this).parent().parent().hide();
		
		// 웹접근성 문제 레이어로 포커스를 이동시켰다가 레이어를 닫을때 기존 위치로 이동
		if(window["focusEle2"] != null){
			window["focusEle2"].focus();
			window["focusEle2"] = null;
		}
		
		if(window["focusEle1"] != null){
			window["focusEle1"].focus();
			window["focusEle1"] = null;
		}
		
		//$('#mask').hide();
	});
	//tooltip hide, 10-21 add
	$(document).on("keypress", ".tmpClose", function () {
		$(this).parent().parent().hide();
		
		// 웹접근성 문제 레이어로 포커스를 이동시켰다가 레이어를 닫을때 기존 위치로 이동
		if(window["focusEle2"] != null){
			window["focusEle2"].focus();
			window["focusEle2"] = null;
		}
		
		if(window["focusEle1"] != null){
			window["focusEle1"].focus();
			window["focusEle1"] = null;
		}
		
		//$('#mask').hide();
	});

	//NCS 직무검색
	$(document).ready(function () {
		
		//직무검색 depth 선택: 대분류 열림
		$(".ncsSchArea .ncsSchSort .tit").on("click", function () {
			$(this).next().stop().slideToggle();
		});
		//직무검색 depth 선택: 대분류 선택
		$(document).on("click", "#ncsSelect1 .ncsSchSortList label", function () {
			$('.ncsSchArea .ncsSchSort .inner').slideUp();//상위분류 닫힘
			$("#ncsSelect2.inner").slideDown();//중분류열림
		});
		//직무검색 depth 선택: 중분류 선택
		$(document).on("click", "#ncsSelect2 .ncsSchSortList label", function () {
			$('.ncsSchArea .ncsSchSort .inner').slideUp();//상위분류 닫힘
			$("#ncsSelect3.inner").slideDown();//소분류열림
		});
		//직무검색 depth 선택: 소분류 선택
		$(document).on("click", "#ncsSelect3 .ncsSchSortList label", function () {
			$('.ncsSchArea .ncsSchSort .inner').slideUp();//상위분류 닫힘
			$("#ncsSelect4.inner").slideDown();//세분류 열림
		});
		//
		$(document).on("click", ".ncsSchSortList label", function () {
			$(this).parent().siblings().find("label").removeClass("on");
		});
	});

});


// /* ==============================
// 	* 툴팁
// * ============================== */
// var toolTip = {
// 	idx : 0,
// 	len : 0,
//
// 	init : function() {
// 		this.tip();
// 	},
//
// 	tip : function() {
// 		var $tip = $('.toolTip').find('.toolTipBtn');
// 		idx = $tip.index(this)
// 		$tip.each(function(){
// 			$(this).on('click', function(e){
// 				var	posX = e.clientX,
// 					posY = e.clientY,
// 					sWidth = window.innerWidth,
// 					sHeight = window.innerHeight,
// 					tooltipW = $(this).siblings().outerWidth();
// 				tooltipH = $(this).siblings().outerHeight();
//
// 				//우측으로 툴팁 오버시
// 				if( (posX+20+tooltipW) > sWidth ){
// 					$(this).siblings().attr('class','toolTipContent');
// 					$(this).siblings().addClass('left');
// 					$(this).siblings().css({
// 						"marginLeft": -(tooltipW+30)
// 					})
// 				}
// 				//상단으로 툴팁 오버시
// 				if( (posY < 140)) {
// 					$(this).siblings().attr('class','toolTipContent');
// 					$(this).siblings().addClass('bottom');
// 					$(this).siblings().css({
// 						"marginTop": '60px',
// 						"marginLeft": -(tooltipW/2-10)
// 					})
// 				}
// 				//하단으로 툴팁 오버시
// 				if( (posY+20+tooltipH) > sHeight) {
// 					$(this).siblings().attr('class','toolTipContent');
// 					$(this).siblings().addClass('top');
// 					$(this).siblings().css({
// 						"marginTop": -(tooltipH+20),
// 						"marginLeft": -(tooltipW/2-10)
// 					})
// 				}else{
// 					//	$this.siblings().toggleClass('on');
// 				}
// 				$(this).siblings().toggleClass('on');
// 			});
// 		});
// 	}
// };

$(document).ready(function () {

});

/* ==============================
	* 네비게이션
* ============================== */
var uiNavigation = {
	idx : 0,
	len : 0,
	init : function(){
		this.close(); // 전체메뉴 닫기
		this.menu(); // 전체메뉴
		this.nav(); // gnb메뉴
	//	this.goTop(); // top버튼 클릭시 페이지 상단으로 이동

	},

	keypress : function() {
		$('.navDepthArea01 li:last').on('keydown', function(e) {
			if(e.keyCode == 9)	$('.totalMenuWrap button:first').focus();
		});		
	},
	
	menu : function() {
		$('.totalMenuBtn').on('click',function() {
			uiNavigation.keypress();
			$('.totalMenuWrap').show();
			$('.totalMenuWrap').css({display:'block'}).animate({right : 0}, 400); 
			$('body').addClass('noScroll');
			$('.totalMenuWrap button:first').focus();
			$('.navDepth01_06.on').removeClass('on');
		});
	},

	close : function() {
		$('.closeTotalMenu').on('click',function() {
			$('.totalMenuWrap').css({display:'block'}).animate({right : '-100%'}, 400); 
			$('body').removeClass('noScroll');
			$('.totalMenuWrap').hide();
			$('.totalMenuBtn').focus();
			
		});
	},
 
	nav : function() { 
		var $depth1 = $('.navDepthArea01');
		var $depthList = $('.navDepthArea01 > li');
 
		var posTopList = {};
		
		$depthList.each(function(){
	
			var h = $($depthList[$depthList.index(this)]).attr("id")=="kdcdLi";
			
			if(h==false){
				var area02Length = $depthList.eq($depthList.index(this)).children('.navDepthArea02').length;

				if(area02Length > 0) {
				    posTopList[$depthList.index(this)] = $depthList.eq($depthList.index(this)).children('.navDepthArea02').offset().top;
					$(this).on('click', function(){	
						idx = $depthList.index(this);					
						$depthList.children('a').removeClass('on');
						$depthList.children('a').eq(idx).addClass('on');
						
						if(idx==0){
							$('.navBody').animate({scrollTop : 0}, 400);
						}else{
							$('.navBody').animate({scrollTop : posTopList[$depthList.index(this)] - posTopList[0] - 85}, 400);	
						}
					});					
				}
			}
			
			
			
			
		/*	var posTop1 = $depthList.eq(0).children('.navDepthArea02').offset().top; 
			var posTop2 = $depthList.eq(1).children('.navDepthArea02').offset().top;
			var posTop3 = $depthList.eq(2).children('.navDepthArea02').offset().top;
			var posTop4 = $depthList.eq(3).children('.navDepthArea02').offset().top;
			var posTop5 = $depthList.eq(4).children('.navDepthArea02').offset().top;

			$(this).on('click', function(){	
				idx = $depthList.index(this);					
				$depthList.children('a').removeClass('on');
				$depthList.children('a').eq(idx).addClass('on');
				if(idx==0){
					$('.navBody').animate({scrollTop : posTop1 - posTop1}, 400);
				}else if(idx==1){
					$('.navBody').animate({scrollTop : posTop2 - posTop1 - 85}, 400);	
				}else if(idx==2){
					$('.navBody').animate({scrollTop : posTop3 - posTop1 - 85}, 400);	
				}else if(idx==3){
					$('.navBody').animate({scrollTop : posTop4 - posTop1 - 85}, 400);	
				}else if(idx==4){
					$('.navBody').animate({scrollTop : posTop5 - posTop1 - 85}, 400);	
				}
			});*/
			
		});	
	},

/* 	goTop : function() {
		$(document).on("click", '.btnGoTop', function(e){
			$(document).scrollTop(0);
			e.preventDefault();
		});
	}	 */
}; 

/* ==============================
	* slider  
* ============================== */



var uiSlider = {
	init : function(){
		//this.topVisual(); //메인 탑 비주얼 (모바일)
		//this.learningCard(); //국민내일배움카드
		//this.notice(); //공지사항
		//this.digitalTech(); //디지털 신기술 인재 양성 과정
		this.trainingCourse(); //정부부처훈련과정
		this.event(); //이벤트 배너		
	},

	//topVisual : function() {
		//var swiperCnt = $('#mainKeyVisual').find('.swiper-slide').length;
		//if ( swiperCnt > 1){
		// 	var swiper = new Swiper('#mainKeyVisual', {
		// 		slidesPerView: 1,
		// 		spaceBetween: 0,
		// 		loop: true,
		// 		pagination: {
		// 			el: '.mainkey-page',
		// 			clickable:true
		// 		},
		// 		autoplay: false
		// 		//autoplayDisableOninteraction: true //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
		// 	});
		//} else {}
	//},
/*

	learningCard : function() {
		var swiperCnt = $('#learningCard').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#learningCard', {
				slidesPerView: 4.5,
				spaceBetween: 10,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable:true,
				}
			});
		} else {}
	},
*/

	notice : function() {

		var swiperCnt = $('.noticeArea').find('.swiper-slide').length;
		if ( swiperCnt > 1) {
			window['noticeArea'] = new Swiper('.noticeArea', {
				direction: 'vertical',
				slidesPerView: 1,
				loop: true,
				pagination: {
					el: '#noticeList-pagination',
					clickable:true,
				},
				autoplay: {
					delay: 2500,
				},
				autoplayDisableOninteraction: true
			});
		}
	},

	//1110 수정
	// digitalTech : function() {
	// 	var swiperCnt = $('#disitalTech').find('.swiper-slide').length;
	// 	if ( swiperCnt > 1)
	// 	{
	// 		var swiper = new Swiper('#disitalTech', {
	// 			slidesPerView: 2,
	// 			spaceBetween: 35,
	// 			loop: true,
	// 			pagination: {
	// 				el: '#digital-pagination',
	// 				clickable:true,
	// 			},
	// 			autoplay: {
	// 				delay: 2500,
	// 			},
	// 			autoplayDisableOninteraction: true
	// 		});
	// 	} else {}
	// },

	trainingCourse : function() {
		var swiperCnt = $('#trainingCourse').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#trainingCourse', {
				slidesPerView: 3,
				spaceBetween: 20,
				loop: true,
				pagination: false
			});
		} else {}
	},
	event : function() {
		var swiperCnt = $('#eventArea').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			window['swiperEventArea'] = new Swiper('#eventArea', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				pagination: {
					el: '#eventPagination',
					clickable:true,
				},
				autoplay: {
					delay: 6000, //2021.09.15 EIS 방문자수 올려야하는거떄문에 2500> 5000으로 딜레이 조정
				},
				on : {
					slideChangeTransitionEnd : function() {
						// 웹 접근성 aria-hidden 처리
						$('div.eventArea li').attr("aria-hidden","true");
						$('div.eventArea li.swiper-slide-active').attr("aria-hidden","false");
					}
				},
				autoplayDisableOninteraction: true //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
			});
		} else {}
	}

	//1103 도움말 슬라이더
	// event : function() {
	// 	var swiperCnt = $('.tutorial-slide').find('.swiper-slide').length;
	// 	if ( swiperCnt > 1)
	// 	{
	// 		,
	// 			autoplayDisableOninteraction: true //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
	// 		});
	// 	} else {}
	// }
}; 

/**************************************
* page load 
***************************************/
$(function($){
	uiNavigation.init();
	uiSlider.init();		
});

$(document).ready(function(){
	$('.tabInterface').find('.tabList').children('.on').children('button').attr('title', '선택됨');
});
