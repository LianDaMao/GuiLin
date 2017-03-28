// JavaScript Document
//验证函数
function atxt(obj){ 
	var nameV = $(obj).val();
	var nameL=$(obj).length;
	
	if(trim(nameV) == '' || nameL == 0){
		//$(obj).focus();
		$(obj).next('.validform').children('.Validform_checktip').text('必填');
		$(obj).next('.validform').show();
	}else{
		$(obj).next('.validform').hide();    
	}       
}

function aPhone(obj){
	var reg = /^[1][0-9]{10}$/;  
	var nameV = $(obj).val();
	var nameL = $(obj).length;
	
	if(trim(nameV) == '' || nameL == 0){
		//$(obj).focus();
		$(obj).next('.validform').children('.Validform_checktip').text('必填');
		$(obj).next('.validform').show();
	}else if(nameL > 0 && !reg.test(nameV)){
		//$(obj).focus();
		$(obj).next('.validform').children('.Validform_checktip').text('格式错误');
		$(obj).next('.validform').show();
	}else{
		$(obj).next('.validform').hide();    
	}   
}

function aFocus(obj){ 
	var nameV = $(obj).val();
	var nameL=$(obj).length;
	
	if(trim(nameV) == '' || nameL == 0 || nameL > 0){
		nameV='';
		$(obj).next('.validform').hide();
	}      
}
//删除左右两端的空格函数
function trim(str) { 　
		return str.replace(/(^\s*)|(\s*$)/g, "");
}


$(document).ready(function(e) {
	//点击提交按钮判断是否为空
	$("#btnSubmit").on("click",function (){
		$(".txtInput").each(function (i,elem){
			atxt(elem);
		})
		$('.tel').each(function(i,elem){
			aPhone(elem);
		})
		var arr=[];
		$(".kong").each(function (i,elem){
			var index=i;
			if(trim($(elem).val()) =='' || $(elem).length ==0){
				arr.push(i);
			}
		})
		//alert(arr);
		var j=arr[0];
		$('.kong')[j].focus();
    })
	//点击输入框清空输入框内容
	$('.kong').on('focus',function(){
		aFocus(this);
	})
	
	//输入框变换字体颜色
	$('.inputBox .input .txt').keyup(function() {
		$(this).addClass('txtfocus');
	})

	//控制textarea输入字数
	function countN(areaN, areaC) {
		$(areaN).bind("input propertychange", function() {
			var $this = $(this),
				_val = $this.val(),
				count = "";
			if(_val.length > 120) {
				$this.val(_val.substring(0, 120));
			}
			count = $this.val().length;
			$(areaC).text(count);
		});
	}
	countN('#area_1', '#text_count_1');
	countN('#area_2', '#text_count_2');

	// checkbox样式美化
	$(".txtC").click(function() {
		var checkbox = $(this).children('input');
		var chkbIClassName = $(this).children('i').attr('class');
		var chkbI = $(this).children('i');
		if(chkbIClassName === 'off') {
			chkbI.removeClass("off").addClass("on");
			$(checkbox).attr('checked', 'checked');
			chkbI.parent().next('.areaBox').show();
		} else if(chkbIClassName === 'on') {
			chkbI.removeClass("on").addClass("off");
			$(checkbox).removeAttr('checked');
			chkbI.parent().next('.areaBox').hide();
		}
	});
	
});