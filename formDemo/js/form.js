$(document).ready(function(){
	/*实现输入框获取焦点改变样式*/
	$('.form_text,.form_area,select').bind({
		focus:function(){
			$(this).addClass('focus');
		},
		blur:function(){
			$(this).removeClass('focus');
		}
	})
	/*---多选框选中----*/
	/*点击整个多选框包括文字*/
	$('.checkbox_check').click(function(){
		if($(this).hasClass('checkbox_check_on')){
			$(this).removeClass('checkbox_check_on');
			$(this).find('.form_checkbox').removeAttr('checked','checked');
		}else{
			$(this).addClass('checkbox_check_on');
			$(this).find('.form_checkbox').prop('checked');
		}
	})
	/*点击多选框不包括文字*/
	/*$('.checkbox_check .icon').click(function(){
		if($(this).parent().hasClass('checkbox_check_on')){
			$(this).parent().removeClass('checkbox_check_on');
			$(this).children('.form_checkbox').removeAttr('checked','checked');
		}else{
			$(this).parent().addClass('checkbox_check_on');
			$(this).children('.form_checkbox').prop('checked','checked');
		}
	})*/

	/*---单选框选中----*/
	/*点击单选包括文字*/
	$('.radio_check').click(function(){
		$(this).addClass('radio_check_on').siblings().removeClass('radio_check_on');
		$(this).find('.form_radio').prop('checked','checked');
		$(this).siblings().find('.form_radio').removeAttr('checked');
	})
	/*点击单选不包括文字*/
	/*$('.radio_check .icon').click(function(){
		$(this).parent().siblings().removeClass('radio_check_on');
		$(this).parent().addClass('radio_check_on');
		$(this).children('.form_radio').prop('checked','checked');
		$(this).parent().siblings().find('.form_radio').removeAttr('checked','checked');
	})*/
	
	/*文本域输入框字数控制，bind绑定*/
	$('.form_area').bind('input propertychange',function(){
		var wordV=$('.form_area').val();
		var num="";
		if(wordV.length>120){
			$(this).val(wordV.substr(0,120));
		}
		num=$(this).val().length;
		/*num=120-$(this).val().length; 剩余*/
		$('.count').text(num);	
	})
	
	/*密码的明文密文转换以及清空*/
	toggleText('.pwd_toggle','.pwd_clear');
	
	/*下拉框select传值*/
	selectText('#selectVal');

	/*图片验证('图片'，'换一张'两个都调用这个函数，正常应该是点击'换一张')*/
	picCode();
	$('.picBox .form_pic,.picBox .change').click(function(){
		picCode();
	});
	
})

/*明文密文切换函数*/
function toggleText(pwdtoggle,clearText){	
	/*鼠标点击输入数据显示 清除按钮*/
	$(pwdtoggle).siblings("input").on("keyup", function() {
		$(this).siblings(clearText).css('display','block');
	})
	/*清空数据*/
	$(clearText).click(function(){
		$(this).siblings('input').val('');
		$(this).css('display','none');
		/*$(pwdtoggle).attr('date-show','1');
		$(pwdtoggle).siblings('input').prop('type','password');
		$(pwdtoggle).css('color','#333'); 让状态回到密文状态*/
	})
	/*明密文切换*/
	$(pwdtoggle).click(function(){
		if($(this).attr('date-show')==1){
			$(this).attr('date-show','2');
			$(this).siblings('input').prop('type','text');  /*让替换属性及时生效用prop()，type为有固有属性，另外attr()此时不起作用*/
			$(this).css('color','#999');
			return;
		}else{
			$(this).attr('date-show','1');
			$(this).siblings('input').prop('type','password');  
			$(this).css('color','#333');
			return;
		}
	})
}

/*下拉框select传值函数*/
function selectText(selectName){
	var selectWord=$('.select_word');
	$(selectName).change(function(){  /*click事件不适合下拉框改变值，改变改变，用change事件*/
		var optionText=$(this).find('option:selected').text();
		selectWord.text(optionText);
	})
	
}

/*图片验证*/
function picCode(){
	var code='';
	var codeLen=4;   /*验证码的长度*/
	var picCode=$('#form_pic');
	/*这个数组也可以是中文*/
	var codeArr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	for(var i=0;i<codeLen;i++){ /*从数组中随机random提取，生成四位数验证码*/
		var randomNum=Math.floor(Math.random()*62); /*'*62'表示取>=0且<62之间的任意整数，（当前数组个数为62，应该是写62）*/
		code += codeArr[randomNum]; 
	} 
	/*赋值*/
	if(picCode){
		picCode.text(code); 
	}
	/*生成随机颜色值（Math.random()*16777215|0表示不足6位在前边补0） 并转成16进制字符*/
	var b=Math.random()*16777215|0;
	var colors="#"+b.toString(16);
	picCode.css('color',colors);
	
    console.log(parseInt("0xffffff",16).toString(10));   /* 十六进制的 '0xffffff'表示十进制的16777215 */


}


