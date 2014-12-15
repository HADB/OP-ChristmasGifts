var SEG = {
    giftOpacity: 100,
    currentPage: 1,
    formData: { name: "", age: 0, phone: 0 }
};
//123
var m;
$(function () {
	 document.addEventListener('touchmove', function (e) {
        if (SEG.currentPage != 5) {
            e.preventDefault();
        }
    }, false);
	 var mheight = document.documentElement.clientHeight || document.body.clientHeight;

	if(mheight<480){
		$('.page-4 .gift-1').css('width','80px');
		$('.page-4 .gift-1').css('height','80px');
		$('.page-4 .gift-1').css('marginTop','-120px');
		$('.page-4 .gift-1').css('marginLeft','-100px');
		$('.page-4 .shadow-1').css('marginLeft','-110px');
		$('.page-4 .shadow-1').css('marginTop','-30px');
		
		$('.page-4 .gift-2').css('width','80px');
		$('.page-4 .gift-2').css('height','80px');
		$('.page-4 .gift-2').css('marginTop','-120px');
		$('.page-4 .gift-2').css('marginLeft','20px');
		$('.page-4 .shadow-2').css('marginLeft','10px');
		$('.page-4 .shadow-2').css('marginTop','-30px');
		
		$('.page-4 .gift-3').css('width','80px');
		$('.page-4 .gift-3').css('height','80px');
		$('.page-4 .gift-3').css('marginTop','20px');
		$('.page-4 .gift-3').css('marginLeft','-100px');
		$('.page-4 .shadow-3').css('marginLeft','-110px');
		$('.page-4 .shadow-3').css('marginTop','110px');
		
		$('.page-4 .gift-4').css('width','80px');
		$('.page-4 .gift-4').css('height','80px');
		$('.page-4 .gift-4').css('marginTop','20px');
		$('.page-4 .gift-4').css('marginLeft','20px');
		$('.page-4 .shadow-4').css('marginLeft','10px');
		$('.page-4 .shadow-4').css('marginTop','110px');
		
		$('.page-7 .back-button').css('bottom','20px');
		
		$('.page-6 .phone-number').css('fontSize','16px');
		$('.page-6 .phone-number').css('top','30%');
	}

    $(".page-1 .button").click(function () {
        showPage(2);
    });

    $(".cup").on("touchmove", function () {
        SEG.giftOpacity -= 1;
        if (SEG.giftOpacity % 10 == 0) {
            $(".cup").css("opacity", SEG.giftOpacity / 100);
        }
        if (SEG.giftOpacity < 1) {
            SEG.giftOpacity = 100;
            $(".cup").addClass("hide");
            $(".socks").addClass("nec-ani-fadeIn");
            $(".socks").removeClass("hide");
            setTimeout(function () {
                $(".socks").removeClass("nec-ani-fadeIn");
            }, 600);
        }
    });

    $(".socks").on("touchmove", function () {
        SEG.giftOpacity -= 1;
        if (SEG.giftOpacity % 10 == 0) {
            $(".socks").css("opacity", SEG.giftOpacity / 100);
        }
        if (SEG.giftOpacity < 1) {
            SEG.giftOpacity = 100;
            $(".socks").addClass("hide");
            showPage(3);
        }
    });

    $(".page-3 .gift").click(function () {
        showPage(4);
    });

    $(".page-4 .gift").click(function (e) {
        showPage(5);
        if ($(e.target).hasClass("gift-1")) {
            $(".page-5 .gift-1").removeClass("hide");
        }
        if ($(e.target).hasClass("gift-2")) {
            $(".page-5 .gift-2").removeClass("hide");
        }
        if ($(e.target).hasClass("gift-3")) {
            $(".page-5 .gift-3").removeClass("hide");
        }
        if ($(e.target).hasClass("gift-4")) {
            $(".page-5 .gift-4").removeClass("hide");
        }
    });

    $(".page-5 .get-jifen-button").click(function () {
        $(".page-5 .form").addClass("nec-ani-fadeIn");
        $(".page-5 .form").removeClass("hide");
        setTimeout(function () {
            $(".page-5 .form").removeClass("nec-ani-fadeIn");
        }, 600);
    });

    $(".page-5 .form .button").click(function () {

        SEG.formData.phone = $(".page-5 .form .phone").val();
        SEG.formData.name = $(".page-5 .form .name").val();
		//SEG.formData.age=$(".page-5 .form .age").html();
        //$(".page-6 .phone-number").html("手机号：" + SEG.formData.phone);//为了后面显示用

        //这里发出ajax请求，并对返回的json进行判断，如果正确的话进行下面两行的操作，否则，不进行任何操作。
		
		    $.ajax({
            //"url": "http://yati_chris.shnow.cn/rexdb.php",
           "url":" ../rexdb.php", 
			"type": "post",
            "data": { 'name': SEG.formData.name, 'agerange': SEG.formData.age,'phone': SEG.formData.phone },
            "crossDomain": true,
            "success": function (result) {
                m =JSON.parse(result) ;
				if(m.resultId=="999"||m.resultId=="4"){
				$(".page-6 .phone-number").html("手机号：" + SEG.formData.phone);
				var mya=[90,100,200,400];
				for(var ind=0;ind<mya.length;ind++){
				//alert("mya="+mya[ind]+"||m.point="+m.point);
				if(mya[ind]!=m.point){
				$("."+"jifen-"+mya[ind]).addClass("hide");
				}
				}
			    showPage(6);
				$(".page-5 .form").addClass("hide");
				}
				else{
				if(m.resultId=="1"){
				$(".page-5 .form .name").val("");
				$(".page-5 .form .name").attr("placeholder","姓名5个汉字或15个英文单词");
				//alert(m.resultName);
				}
				else if(m.resultId=="6"){
				 //SEG.formData.age = 1;
            $(".page-5 .form .age").html("<font style='color:rgb(186, 186, 186)'>请选择年龄</font>");
				}
				
				else{
				$(".page-5 .form .phone").val("");
				$(".page-5 .form .phone").attr("placeholder","手机号码不正确");
				}
				}
            }
        })


    });

    $(".page-5 .form .age").click(function () {
        $(".page-5 .form .dropdown").removeClass("hide");
    });

    $(".page-5 .form .dropdown div").click(function (e) {
        if ($(e.target).hasClass("dropdown-age-1")) {
            SEG.formData.age = 1;
            $(".page-5 .form .age").html("18-25岁");
        }
        if ($(e.target).hasClass("dropdown-age-2")) {
            SEG.formData.age = 2;
            $(".page-5 .form .age").html("26-36岁");
        }
        if ($(e.target).hasClass("dropdown-age-3")) {
            SEG.formData.age = 3;
            $(".page-5 .form .age").html("36-45岁");
        }
        if ($(e.target).hasClass("dropdown-age-4")) {
            SEG.formData.age = 4;
            $(".page-5 .form .age").html("45岁以上");
        }
        $(e.target).css("opacity", 0.6);
        setTimeout(function () {
            $(".page-5 .form .dropdown").addClass("hide");
            $(e.target).css("opacity", 0);
        }, 200);
    });

    $(".page-6 .shops-button").click(function () {
        showPage(7);
    });

    $(".page-7 .back-button").click(function () {
        //showPage(1);
		window.location.href="http://yati_chris.shnow.cn/index.html";
    });
});

function showPage(pageNumber) {
    $(".page-" + SEG.currentPage).addClass("nec-ani-fadeOut");
    setTimeout(function () {
        $(".page-" + SEG.currentPage).addClass("hide");
        $(".page-" + SEG.currentPage).removeClass("nec-ani-fadeOut");
		window.scrollTo(0, 0);
        $(".page-" + pageNumber).addClass("nec-ani-fadeIn");
        $(".page-" + pageNumber).removeClass("hide");
        setTimeout(function () {
            $(".page-" + pageNumber).removeClass("nec-ani-fadeIn");
        }, 600);
        SEG.currentPage = pageNumber;
    }, 600);
    if (pageNumber == 3) {
        setTimeout(function () {
            $(".cup").removeClass("hide");
        }, 600);
    }
}