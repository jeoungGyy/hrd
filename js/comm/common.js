/**
 * HRD-Net 공통 함수 호출
 */
var contextPathNm = "";
$(document).ready(function(){		
	gfn_initCalendar();	
/*	// modal 팝업 div tag 추가
	$("body").prepend('<div id="dialog-pop"></div>');*/
	
	if(!gfn_isNull(gfv_contextpath)){
		contextPathNm = gfv_contextpath;
	}	
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	if(typeof token  != 'undefined' && typeof header != 'undefined') {
//		const koreaTime = Date.now().toLocaleString('ko-KR', {timeZone:'Asia/Seoul'});
		$.ajaxSetup({
		     beforeSend: function(request){
		      request.setRequestHeader(header, token);
		      request.setRequestHeader('request-time', new Date().toLocaleString('ko-KR', {timeZone:'Asia/Seoul', hour12:false, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit',minute:'2-digit', second:'2-digit'}).replace(/[^0-9]/g,''));
		     }
		});
	}
});

$.validator.setDefaults({
	onkeyup:false,
	onclick:false,
	onfocusout:false,
	showErrors:function(errorMap, errorList){
		if(this.numberOfInvalids()){
			alert(errorList[0].message);
			$(errorList[0].element).focus();
		}
	}
});


/********************************************
@함수명  	gfn_initCalendar
@설명   	달력을 호출한다.
@인자   	날짜가 입력될 text id
@반환    	없음
@작성일  	2016.03.16
@작성자  	박재덕
@변경일			변경자        변경내역 

2016. 3. 16		박재덕        최초작성
*********************************************/
function gfn_initCalendar(){
	$(".btn_calendar").each(function(){
		$(this).on("click",function(){
			gfn_openBtnCalendar($(this).attr("id"));
		});
	});
	$(".btn_calendar").trigger("click");
}

/********************************************
@함수명  	ComAjax
			- setUrl 		: 전송할 URL을 지정한다.
			- setTarget 	: 타켓을 지정한다.
			- addParam 		: 파라메터의 키와 값을 설정한다.	 
			- tran 			: 입력값을 전송한다.
@설명   	공통적인 Ajax 호출 방식
@인자   	form ID, Form ID가 존재하면 Form 객체의 모든 정보를 가지고 온다.
@반환    	없음
@작성일  	2016.05.10
@작성자  	박재덕
@변경일			변경자        변경내역 

2016.05.10		박재덕        최초작성
*********************************************/
function ComAjax(opt_formId){
	
	this.url 		= "";					// 호출 url
	this.formId 	= opt_formId;			// 폼 id
	this.param 		= "tranType=ComAjax";	// 파라메터
	
	this.dataType 	= "json";				// json 형식 
	this.async 		= false;				// 동기
	
	//URL 설정
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.getUrl = function getUrl(){
		return this.url;
	};
	
	//파리미터 설정
	this.addParam = function addParam(key,value){ 
		if(gfn_isNull(value) == false){
			if(typeof(value)=="string"){ 
				this.param = this.param + "&" + key + "=" + value.replace(/\&/gi,"＆").replace(/\%/gi,"％").replace(/\+/gi,"＋");
			}else{
				this.param = this.param + "&" + key + "=" + value;
			}
		}else{
			this.param = this.param + "&" + key + "=" + value; 
		}
	};
	
	this.getParam = function getParam(){
		return this.param;
	};
	
	//callBack함수 설정
	this.setCallBack = function setCallBack(callBack){
		fv_comAjaxCallBack = callBack;
	};
	
	this.tran = function tran(){
		if(gfn_isNull(this.formId) == false){			
			this.param += "&" + $("#" + this.formId).serialize();
		}
		
		$.ajax({
			url : this.url,    
			type : "POST",   
			data : this.param,
			//dataType : this.dataType,
			async : this.async, 
			success : function(data, status) {
				// success
				if(gfn_isNull(data._EXCEPTION) == true) {
					if(typeof(fv_comAjaxCallBack) == "function"){
						fv_comAjaxCallBack(data);
					}else {
						eval(fv_comAjaxCallBack + "(data);");
					}
				}
				else {	
					// error					
					alert(data._EXCEPTION.ERROR_MSG);
				}
			}
		});
	};
}


/********************************************
@함수명  	ComSubmit
			- setUrl 		: 전송할 URL을 지정한다.
			- setTarget 	: 타켓을 지정한다.
			- addParam 		: 파라메터의 키와 값을 설정한다.	 
			- tran 			: 입력값을 전송한다.
@설명   	입력폼을 전송(submit)한다.
@인자   	String formId
@반환    	없음
@작성일  	2016. 4. 5.
@작성자  	오세길
@변경일			변경자        변경내역 

2016. 4. 5.		오세길        최초작성
*********************************************/
function ComSubmit(opt_formId) {
	
	this.formId = gfn_isNull(opt_formId) == true ? "hrdCmmPopup" : opt_formId;
	this.url = '';
	this.target = '';
	this.delElementId = '';

	
	// url 세팅
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	// param 세팅
	this.addParam = function addParam(key, value){
		if(this.formId == "hrdCmmPopup"){
			
			// 추가할 key값이 존재하면 삭제 후 추가
			$("#"+this.formId).find("input[name=" + key + "]").remove();
			$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));

			//팝업 호출시 해당 부모창에 남겨져 있는 input을 삭제하기 위해 저장
			if(gfn_isNull(this.delElementId) == true){
				this.delElementId = key;
			}else{
				this.delElementId = this.delElementId+":"+ key;
			}
		}
		else{
			if(gfn_isNull($("#"+this.formId).find($("#"+key)).attr("id")) == false){
				$("#"+this.formId).find($("#"+key)).remove();
			}
			$("#"+this.formId).append("<input type='hidden' id='"+key+"' name='"+key+"' value='"+value+"' />");
		}
	};
	
	// 타켓 세팅
	this.setTarget=function setTarget(target){
		this.target = target;
	};
	
	this.tran = function tran(){
		//target 설정

		$("#"+this.formId).prop("action",this.url);
		$("#"+this.formId).prop("method","post");
		$("#"+this.formId).prop("target",this.target);
		$("#"+this.formId).submit();	

		// 타겟 & 파라메터 초기화
		if(gfn_isNull(this.target) == false){
			this.target = '';
			
			var delElementIdList = this.delElementId.split(":");

			for(var i=0; i<delElementIdList.length; i++){
				
				var delElementId = delElementIdList[i];
				
				$("#"+this.formId+" input[id="+delElementId+"]").remove();
			}
		}
	};
}

/********************************************
@함수명  	gfn_openPopUp
@설명   	팝업을 호출한다.
@인자   	String strFile, String strPopName, Object objParams, String strWidth, String strHeight
@입력형태	strFile : /sample/samplePop 등의 호출할 파일 경로
			strPopName : 팝업명 
			objParams : 팝업에 전달해야할 인자값 object
			strWidth : 팝업 넓이
			strHeight : 팝업 높이
@반환    	없음
@작성일  	2016. 4. 5.
@작성자  	오세길
@변경일			변경자        변경내역 

2016. 4. 5.		오세길        최초작성
*********************************************///"
function gfn_openPopUp(strFile,strPopName,objParams,strWidth,strHeight) {
	
	var popupSubmit = new ComSubmit();
	
	//이동할 URL설정
	popupSubmit.setUrl(strFile);
	
	strPopName = gfn_trim(strPopName);
	//페이지를 이동시킬 target 설정
	popupSubmit.setTarget(strPopName);
	
	//전달할 파라미터들을 셋팅
	if(gfn_isNull(objParams) == false){
		$.each(objParams,function(key,val){
			popupSubmit.addParam(key, val);
		});
	}
	
	//팝업 호출
	window.open("", strPopName, "width="+strWidth+",height="+strHeight+", scrollbars=1 , location=no");
	
	//팝업에 해당 url로 submit 시킴
	popupSubmit.tran();
}

/********************************************
@함수명  	gfn_openModalPop
@설명   	modal팝업을 호출한다
@인자		String strPopName, Object objParams, String dialogHtml, 
			String widthSize, String heightSize, function func
@입력형태	StrPopName : 팝업명 
			objParams : 팝업에 전달해야할 인자값 object
			diHtml : 팝업 화면구성 HTML
			widthSize : 가로사이즈
			heightSize : 세로사이즈
			func : 초기화 함수
@반환		없음
@작성일  	2016. 4. 18.
@작성자  	오세길
@변경일			변경자        변경내역 

2016. 4. 18.	오세길        최초작성
*********************************************/
function gfn_openModalPop(strPopName,objParams,diHtml,widthSize,heightSize,func){
	// 팝업 최초 호출 시 초기화 함수
	var funcInit = func;
	// 팝업 화면구성
	var dialogHtml = '';
	dialogHtml += diHtml;
	dialogHtml += '<div>';		
	dialogHtml += 	'<input type="button" id="popClose" name="popClose" value="닫기"/>'; 
	dialogHtml += '</div>';
	
	// 팝업크기 셋팅 (null일경우 기본값)
	var tmpWidth  = (gfn_isNull(widthSize) == true)  ? "500" : widthSize;
	var tmpHeight = (gfn_isNull(heightSize) == true) ? "700" : heightSize;
	// modal팝업 기본 프로퍼티 셋팅
	$("#dialog-pop").dialog({
		// 이벤트가 발생했을때 팝업 오픈
		autoOpen: false,
		// 팝업 크기 재조절 false
		resizable: false,
		// modal 형태
		modal: true,
		// 팝업 타이틀
		title:strPopName,
		// 팝업 넓이
		width: tmpWidth,
		// 팝업 높이
		height: tmpHeight, 

		/*****************기타 프로퍼티*****************
		// 팝업 위치
		position:{my:"center", at:"top+200", of:window},
		// 팝업 위치 고정
		draggable:false,
		// 버튼추가
		buttons:{
			"닫기":function(){
				$(this).dialog("close");
			}
		},		
		// 타이틀바 X버튼에 마우스오버 했을 때 나타나는 텍스트
		closeText:"닫기버튼"
		// 애니메이션 효과 - 보여줄때
		show:{
			effect:"blind",
			duration: 1000
		},
		// 애니메이션 효과 - 감출때
		hide:{
			effect:"explode",
			duration: 1000
		},
		************************************************/
		
		// 팝업 초기화
		open:function(event, ui){
			// modal팝업 뒤 배경 흐리게
			$('.ui-widget-overlay').css("opacity",0.5); 
			// 초기화 함수 존재 시 함수 호출
			if(gfn_isNull(funcInit) == false){	
				funcInit();
				funcInit = null;
			}
			
		/*****************기타 옵션*********************
			// 타이틀바 제거
			$('.ui-dialog-titlebar').hide();
			$('.ui-dialog-titlebar').remove();
			// 타이틀바 X버튼 제거
			$('.ui-dialog-titlebar-close').hide();
			$('.ui-dialog-titlebar-close').remove();
		************************************************/	
			
		}
	});	

	// 팝업호출
	$("#dialog-pop").html(dialogHtml);
	$("#dialog-pop").dialog('open');
	
	// 팝업창의 "닫기"버튼 클릭 시
	$('#popClose').on("click",function(){
		$("#dialog-pop").dialog('close');
	});	
}

/********************************************
@함수명  	gfn_getMessageValue
@설명   	Message 정보를 불러온다.
@인자   	code - Message 코드값,arg - Message Argument
@반환    	없음
@작성일  	2016. 5. 03
@작성자  	박재덕
@변경일			변경자        변경내역 

2016.5.03		박재덕        최초작성
*********************************************/
function gfn_getMessageValue(code,arg){
	//gfn_getMessageValue("MSG00048","아이디,2")로 호출		
	var argValue 	= gfn_isNull(arg) ? "" : arg; 	//arg가 없을경우 빈값으로		
	var returnMsg 	= "";						 	//return할 메지시 정보
	$.ajax({
		url: contextPathNm+"/comm/com/selectMessageValue.do",
		type: 'POST',
		async : false,
		data: { 
			msgCode : code,
			msgArg 	: argValue
		},
		success: function(data) {			
			returnMsg = data.result;
		},
		error: function(data){
			returnMsg = "";
		}
	});
	
	return returnMsg;
	
}

/********************************************
@함수명  	gfn_comCodeTag
@설명   	부모코드값을사용하여 Select Tag를 생성한다.
@인자   	Parent Code, Select Id, Empty Name
@반환    	없음
@작성일  	2016. 4. 25
@작성자  	박재덕
@변경일			변경자        변경내역 

2016.4.25		박재덕        최초작성
*********************************************/
function gfn_comCodeTag(code,target,empty){
		
	var strBuffer 	= "";									//화면에 출력할 html 작성문
	var emptyNm 	= gfn_isNull(empty) ? "" : empty;		//빈값일때 이름
	var isNotEmpty 	= gfn_isNull(empty) ? false : true;		//빈값출력여부
		
	$.ajax({
		url: contextPathNm+"/comm/com/selectComCodeAjax.do",
		type: 'POST',
		data: { 
			tranType : "ComAjax",
			parentKey : code
		},
		success: function(data) {
			if(gfn_isNull(data._EXCEPTION) == true) {
				var listLength = data.result.length;
				
				if(listLength==0){
					var returnMsg = gfn_getMessageValue("MSG00021");
					alert(returnMsg);
				}else{
					if(isNotEmpty){
						strBuffer += "<option value=''>" + emptyNm + "</option>";
					}			
					
					$(data.result).each(function(idx,item) {
						strBuffer += "<option value='" + item.comcdValue + "'>" + item.comcdValueNm + "</option>";				
					});
							
					$("#"+target).empty();
					$("#"+target).append(strBuffer);
				}
			}else{
				// error					
				alert(data._EXCEPTION.ERROR_MSG);
			}
		},
		error: function(data){
			var returnMsg = gfn_getMessageValue("MSG00072");
			alert(returnMsg);
		}
	});
}

/********************************************
@함수명  	gfn_comCodeMultiTag
@설명   	부모코드값을사용하여 Select Multiple Tag를 생성한다.
@인자   	Parent Code, Select Id, Empty Name
@반환    	없음
@작성일  	2016. 4. 25
@작성자  	박재덕
@변경일			변경자        변경내역 

2016.4.25		박재덕        최초작성
*********************************************/
function gfn_comCodeMultiTag(code,target,empty){

	var strBuffer 	= "";										//화면에 출력할 html 작성문
	var emptyNm 	= gfn_isNull(empty) ? "선택" : empty;		//빈값일때 이름
	
	var strWidth = gfn_isNull($("#"+target).css("width")) ? "100%" : $("#"+target).css("width");	//selectbox Width값 가져오기
	
	$.ajax({
		url: contextPathNm+"/comm/com/selectComCodeAjax.do",
		type: 'POST',
		data: { 
			tranType : "ComAjax",
			parentKey : code
		},
		success: function(data) {
			if(gfn_isNull(data._EXCEPTION) == true) {
				var listLength = data.result.length;
				
				if(listLength==0){
					var returnMsg = gfn_getMessageValue("MSG00021");
					alert(returnMsg);
				}else{					
					$(data.result).each(function(idx,item) {
						strBuffer += "<option value='" + item.comcdValue + "'>" + item.comcdValueNm + "</option>";				
					});
							
					$("#"+target).empty();
					$("#"+target).append(strBuffer);					
					//Multiple을 checkbox로 변경
					$("#"+target).multiselect({						
						placeholder	: emptyNm,						
						search		: true,		
						maxWidth	: strWidth,
				        searchOptions : {
				            'default'    : '검색',
				            showOptGroups: false,
				            onSearch     : function( element ){} 
				        },
				        selectAll     : true
					});
					$("#"+target).multiselect('reload'); // 데이터갱신
				}
			}else{
				// error					
				alert(data._EXCEPTION.ERROR_MSG);
			}
		},
		error: function(data){
			var returnMsg = gfn_getMessageValue("MSG00072");
			alert(returnMsg);
		}
	});
}

/********************************************
@함수명  	gfn_comCodeFunc
@설명   	부모코드값을사용하여 생성하고 Function을 실행한다.
@인자   	날짜가 입력될 text id
@반환    	없음
@작성일  	2016.04.25
@작성자  	박재덕
@변경일			변경자        변경내역 

2016. 4. 25		박재덕        최초작성
*********************************************/
function gfn_comCodeFunc(code,func){
	
	var funcNm 	= func;	//실행할 Function 명		
	$.ajax({
		url: contextPathNm+"/comm/com/selectComCodeAjax.do",
		type: 'POST',
		data: {
			tranType : "ComAjax",
			parentKey : code
		},
		success: function(data) {
			if(gfn_isNull(data._EXCEPTION) == true) {
				if(!gfn_isNull(funcNm)){	
					var listLength = data.result.length;
					
					if(listLength==0){						
						var returnMsg = gfn_getMessageValue("MSG00021");
						alert(returnMsg);
					}else{
						funcNm(data.result);
					}
					funcNm = null;
				}
			}else{
				// error					
				alert(data._EXCEPTION.ERROR_MSG);
			}
		},
		error: function(data){
			var returnMsg = gfn_getMessageValue("MSG00072");
			alert(returnMsg);
		}
	});
}

/********************************************
@함수명  	gfn_comCodeDetailFunc
@설명   	부모코드값과 본코드값을 코드정보를 불러온후 Function을 실행한다.
@인자   	날짜가 입력될 text id
@반환    	없음
@작성일  	2016. 4. 25
@작성자  	박재덕
@변경일			변경자        변경내역 

2016. 4. 25		박재덕        최초작성
*********************************************/
function gfn_comCodeDetail(parentCode,code,func){
	
	var funcNm2	= func;	//실행할 Function 명
		
	$.ajax({ 
		url: contextPathNm+"/comm/com/selectComCodeDetailAjax.do",
		type: 'POST',
		data: { 
			tranType : "ComAjax",
			parentKey : parentCode,
			codeKey : code
			
		},
		success: function(data) {		
			if(gfn_isNull(data._EXCEPTION) == true) {
				if(!gfn_isNull(funcNm2)){
					if(data.result==null){
						var returnMsg = gfn_getMessageValue("MSG00021");
						alert(returnMsg);
					}else{	
						funcNm2(data.result);
					}
					funcNm2 = null;
				}
			}else{
				// error					
				alert(data._EXCEPTION.ERROR_MSG);
			}
		},
		error: function(data){
			var returnMsg = gfn_getMessageValue("MSG00072");
			alert(returnMsg);
		}
	});
}

/********************************************
@함수명  	gfn_comCodeChoiseTag
@설명   	부모코드값을사용하여 Select Tag를 생성한다.
@인자   	comcdId,choiseSe,selComcdId,target,empty
@반환    	없음
@작성일  	2016. 11. 24
@작성자  	박민호
@변경일			변경자        변경내역 

2016.4.25		박민호        최초작성
*********************************************/
function gfn_comCodeChoiseTag(comcdId,choiseSe,selComcdId,target,empty){
		
	var strBuffer 	= "";									//화면에 출력할 html 작성문
	var emptyNm 	= gfn_isNull(empty) ? "" : empty;		//빈값일때 이름
	var isNotEmpty 	= gfn_isNull(empty) ? false : true;		//빈값출력여부
		
	$.ajax({
		url: contextPathNm+"/comm/com/selectComCodeChoiseAjax.do",
		type: 'POST',
		data: { 
			tranType : "ComAjax",
			comcdId : comcdId ,
			choiseSe : choiseSe
		},
		success: function(data) {
			if(gfn_isNull(data._EXCEPTION) == true) {
				var listLength = data.result.length;
				
				if(listLength==0){
					var returnMsg = gfn_getMessageValue("MSG00021");
					alert(returnMsg);
				}else{
					if(isNotEmpty){
						strBuffer += "<option value=''>" + emptyNm + "</option>";
					}			
					
					$(data.result).each(function(idx,item) {
						if(item.comcdValue == selComcdId){
							strBuffer += "<option value='" + item.comcdValue + "' selected>" + item.scnidtComcdValueNm + "</option>";				
						}else{
							strBuffer += "<option value='" + item.comcdValue + "'>" + item.scnidtComcdValueNm + "</option>";				
						}
						
					});
							
					$("#"+target).empty();
					$("#"+target).append(strBuffer);
				}
			}else{
				// error					
				alert(data._EXCEPTION.ERROR_MSG);
			}
		},
		error: function(data){
			var returnMsg = gfn_getMessageValue("MSG00072");
			alert(returnMsg);
		}
	});
}

/********************************************
@함수명  	gfn_loadStart
@설명   	Loading 화면을 불러온다.
@인자   	없음
@반환    	없음
@작성일  	2016. 5. 20
@작성자  	안혁
@변경일			변경자        변경내역 

2016. 5. 20		안  혁        최초작성
*********************************************/
function gfn_loadStart() {
	
	$("#body_loading_top").css("height", $("body").css("height"));	
	
	$("#body_loading_top").attr("class", "body_loading_top");
	
	$("#div_loading_top").attr("class", "loading_img_top");
	
	$("#div_loading_top").css("margin-top", 150 + $(window).scrollTop()); 
	
	$("#body_loading_top").css("display", "");
	
}

/********************************************
@함수명  	gfn_loadEnd
@설명   	Loading 화면을 닫는다. 
@인자   	없음
@반환    	없음
@작성일  	2016. 5. 20
@작성자  	안혁
@변경일			변경자        변경내역 

2016. 5. 20		안  혁        최초작성
*********************************************/
function gfn_loadEnd(bAnimate) {
	if(bAnimate == false) {
		$("#body_loading_top").css('display', 'none');		
	}
	else {
		$("#body_loading_top").fadeOut(1000);
	}		
}

/* MarkAny 적용 RD 출력 */ 
function gfn_secretViewer( rdpath, rdparam , docNo ) {

	$("#RD_fileDir").remove();		//기존 파일 정보 삭제
	$("#RD_fileParam").remove();	//기존 파라미터 정보 삭제
	$("#RD_docNo").remove();		//문서 정보 삭제
	$("#RD_reportView").remove();	//기존 form 삭제
	
	if(gfn_isNull( rdparam )){
		rdparam = "" ;
	}
	if(gfn_isNull(docNo)){
		docNo = "" ;
	}

	var appendForm = "<form id='RD_reportView' name='reportView' action='' method='post'></form>";
	var  csrfVar = $('meta[name="_csrf"]').attr('content');
	$("body").prepend(appendForm);
	
	$("#RD_reportView").append($("<input name='_csrf' value='" + csrfVar + "' type='hidden'>"));
	$("#RD_reportView").append($("<input type='hidden' id='RD_rdpath'   name='rdpath'  value='" + rdpath  + "' >"));
	$("#RD_reportView").append($("<input type='hidden' id='RD_rdparam'  name='rdparam' value='" + rdparam + "' >"));
	$("#RD_reportView").append($("<input type='hidden' id='RD_docNo'    name='docNo'   value='" + docNo   + "' >"));
	
	// markany call 
	window.open("", "reportViewer_" + rdpath, "width=400,height=300, scrollbars=0 , location=no");
	
	$("#RD_reportView").attr("action", contextPathNm+"/comm/com/processSecretView.do");
	$("#RD_reportView").attr("method", "post");
	$("#RD_reportView").attr("target", "reportViewer_" + rdpath ) ;
	$("#RD_reportView").submit();	

}

function gfn_reportViewer(fileDir, fileParam, docNo, strWidth, strHeight){

	$("#RD_fileDir").remove();		//기존 파일 정보 삭제
	$("#RD_fileParam").remove();	//기존 파라미터 정보 삭제
	$("#RD_docNo").remove();		//문서 정보 삭제
	$("#RD_reportView").remove();	//기존 form 삭제
	
	if(gfn_isNull(fileParam)){
		fileParam="";
	}
	if(gfn_isNull(docNo)){
		docNo="";
	}
	if(gfn_isNull(strWidth)){
		strWidth="800px";
	}
	if(gfn_isNull(strHeight)){
		strHeight="700px";
	}
	
	var appendForm = "<form id='RD_reportView' name='reportView' action='' method='post'></form>";
	var  csrfVar = $('meta[name="_csrf"]').attr('content');
	$("body").prepend(appendForm);
	
	$("#RD_reportView").append($("<input name='_csrf' value='" + csrfVar + "' type='hidden'>"));
	$("#RD_reportView").append($("<input type='hidden' id='RD_fileDir' name='fileDir' value='"+fileDir+"' >"));
	$("#RD_reportView").append($("<input type='hidden' id='RD_fileParam' name='fileParam' value='"+fileParam+"' >"));
	$("#RD_reportView").append($("<input type='hidden' id='RD_docNo' name='docNo' value='"+docNo+"' >"));
	
	//팝업 호출
	window.open("", "reportViewer_"+fileDir, "width="+strWidth+",height="+strHeight+", scrollbars=0 , location=no");
	
	$("#RD_reportView").prop("action",contextPathNm+"/comm/com/processReportView.do");
	$("#RD_reportView").prop("method","post");
	$("#RD_reportView").prop("target","reportViewer_"+fileDir);
	$("#RD_reportView").submit();	
}


/********************************************
@함수명  	gfn_fn_insertSUREData
@설명   	카카오 알림톡/SMS 전송
@인자   	String reqname,String reqphone,String callname,String callphone,String subject, String msg, String resend,String retext
@입력형태	reqname : 발신자명
					reqphone : 발신자 연락처
					callname : 수신자명
					callphone : 수신자연락처
					subject : sms발송시 제목
					msg : 메시지 내용(템플릿 내용도 포함)
					resend : 문자 재처리 여부 Y : 알림톡으로 보내려고 했던 내용 그대로 문자로 재처리,
													        R : 문자로 재처리할 시 RETEXT 필드에 입력한 대체메시지로 문자 보냄,
													        N : 문자로 재처리하지 않음
					retext : 문자로 보낼 때 활용할 대체 메시지
@반환    	없음
@작성일  	2018. 02. 28
@작성자  	한윤수
@변경일			변경자        변경내역 
2018.02.08		한윤수        최초작성
*********************************************/
function gfn_insertSUREData(reqname,reqphone,callname,callphone,subject,msg,resend,retext,templatecode){

$.ajax({
	url: contextPathNm+"/comm/com/insertSUREData.do",
	dataType : 'json',
	type : 'POST',
	data : {
		reqname  : reqname    
		, reqphone : reqphone 
		, callname  : callname 
		, callphone : callphone
		, subject     : subject  
		, msg         : msg      
		, resend     : resend   
		, retext        : retext
		, templatecode : templatecode
	},
		async : false,
		success : function(data) {
	}
});

}