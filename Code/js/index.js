var SEG = {
    giftOpacity: 100,
    currentPage: 1,
    formData: { name: "", age: 0, phone: 0 }
};
var m;
$(function () {
    document.addEventListener('touchmove', function (e) {
        if (SEG.currentPage != 5 && SEG.currentPage != 2) {
            e.preventDefault();
        }
    }, false);
    var mheight = document.documentElement.clientHeight || document.body.clientHeight;

    if (mheight < 480) {
        $('.page-4 .gift-1').css('width', '80px');
        $('.page-4 .gift-1').css('height', '80px');
        $('.page-4 .gift-1').css('marginTop', '-120px');
        $('.page-4 .gift-1').css('marginLeft', '-100px');
        $('.page-4 .shadow-1').css('marginLeft', '-110px');
        $('.page-4 .shadow-1').css('marginTop', '-30px');

        $('.page-4 .gift-2').css('width', '80px');
        $('.page-4 .gift-2').css('height', '80px');
        $('.page-4 .gift-2').css('marginTop', '-120px');
        $('.page-4 .gift-2').css('marginLeft', '20px');
        $('.page-4 .shadow-2').css('marginLeft', '10px');
        $('.page-4 .shadow-2').css('marginTop', '-30px');

        $('.page-4 .gift-3').css('width', '80px');
        $('.page-4 .gift-3').css('height', '80px');
        $('.page-4 .gift-3').css('marginTop', '20px');
        $('.page-4 .gift-3').css('marginLeft', '-100px');
        $('.page-4 .shadow-3').css('marginLeft', '-110px');
        $('.page-4 .shadow-3').css('marginTop', '110px');

        $('.page-4 .gift-4').css('width', '80px');
        $('.page-4 .gift-4').css('height', '80px');
        $('.page-4 .gift-4').css('marginTop', '20px');
        $('.page-4 .gift-4').css('marginLeft', '20px');
        $('.page-4 .shadow-4').css('marginLeft', '10px');
        $('.page-4 .shadow-4').css('marginTop', '110px');

        $('.page-7 .back-button').css('bottom', '20px');

        $('.page-6 .phone-number').css('fontSize', '16px');
        $('.page-6 .phone-number').css('top', '30%');
    }

    $(".page-1 .button").click(function () {
        showPage(2);
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

        $.ajax({
            "url": "http://yati_chris.shnow.cn/rexdb.php",
            //"url": " ../rexdb.php",
            "type": "post",
            "data": { 'name': SEG.formData.name, 'agerange': SEG.formData.age, 'phone': SEG.formData.phone },
            "crossDomain": true,
            "success": function (result) {
                m = JSON.parse(result);
                if (m.resultId == "999" || m.resultId == "4") {
                    $(".page-6 .phone-number").html("手机号：" + SEG.formData.phone);
                    var mya = [90, 100, 200, 400];
                    for (var ind = 0; ind < mya.length; ind++) {
                        if (mya[ind] != m.point) {
                            $("." + "jifen-" + mya[ind]).addClass("hide");
                        }
                    }
                    showPage(6);
                    $(".page-5 .form").addClass("hide");
                }
                else {
                    if (m.resultId == "1") {
                        $(".page-5 .form .name").val("");
                        $(".page-5 .form .name").attr("placeholder", "姓名5个汉字或15个英文单词");
                    }
                    else if (m.resultId == "6") {
                        $(".page-5 .form .age").html("<font style='color:rgb(186, 186, 186)'>请选择年龄</font>");
                    }

                    else {
                        $(".page-5 .form .phone").val("");
                        $(".page-5 .form .phone").attr("placeholder", "手机号码不正确");
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
        window.location.href = "http://yati_chris.shnow.cn/index.html";
    });
});

function showPage(pageNumber) {
    var outClass = "nec-ani-fadeOut";
    var inClass = "nec-ani-fadeIn";

    if (pageNumber == 3) {
        outClass = "nec-ani-rotateOut";
    }

    $(".page-" + SEG.currentPage).addClass(outClass);
    setTimeout(function () {
        $(".page-" + SEG.currentPage).addClass("hide");
        $(".page-" + SEG.currentPage).removeClass(outClass);
        window.scrollTo(0, 0);
        $(".page-" + pageNumber).addClass(inClass);
        $(".page-" + pageNumber).removeClass("hide");
        if (pageNumber == 2) {
            var canvas = $("#cas")[0];
            canvas.width = $(".bottom-layer").width();
            canvas.height = $(".bottom-layer").height();
            var context = canvas.getContext("2d");
            var img1 = new Image();
            img1.src = "img/page_2/cup.jpg";
            img1.onload = function () {
                context.drawImage(img1, 0, 0, canvas.width, canvas.height);
                $(".bottom-layer").removeClass("opacity-0");
                tapClip(canvas, context);
            };
        }

        setTimeout(function () {
            $(".page-" + pageNumber).removeClass(inClass);
        }, 600);
        SEG.currentPage = pageNumber;
    }, 600);
}

function tapClip(canvas, context) {
    var x1, y1, a = 20, timeout, totimes = 10, jiange = 20;
    var currentGift = 1;
    var wait = false;
    var hastouch = "ontouchstart" in window ? true : false,
        tapstart = hastouch ? "touchstart" : "mousedown",
        tapmove = hastouch ? "touchmove" : "mousemove",
        tapend = hastouch ? "touchend" : "mouseup";

    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = a * 2;
    context.globalCompositeOperation = "destination-out";

    canvas.addEventListener(tapstart, function (e) {
        clearTimeout(timeout);
        e.preventDefault();
        x1 = (hastouch ? e.targetTouches[0].pageX : e.clientX) - canvas.offsetLeft - $(".pages")[0].offsetLeft;
        y1 = (hastouch ? e.targetTouches[0].pageY : e.clientY) - canvas.offsetTop - $(".pages")[0].offsetTop;
        context.save();
        context.beginPath();
        context.arc(x1, y1, 1, 0, 2 * Math.PI);
        context.fill();
        context.restore();

        canvas.addEventListener(tapmove, tapmoveHandler);
        canvas.addEventListener(tapend, function () {
            canvas.removeEventListener(tapmove, tapmoveHandler);

            timeout = setTimeout(function () {
                var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                var dd = 0;
                for (var x = 0; x < imgData.width; x += jiange) {
                    for (var y = 0; y < imgData.height; y += jiange) {
                        var i = (y * imgData.width + x) * 4;
                        if (imgData.data[i + 3] > 0) {
                            dd++;
                        }
                    }
                }
                if (dd / (imgData.width * imgData.height / (jiange * jiange)) < 0.8) {
                    if (currentGift == 1 && !wait) {
                        var img2 = new Image();
                        img2.src = "img/page_2/socks.jpg";
                        context.globalCompositeOperation = 'source-over';
                        context.drawImage(img2, 0, 0, canvas.width, canvas.height);
                        context.globalCompositeOperation = 'destination-out';
                        $(".bottom-layer").addClass("opacity-0");
                        wait = true;
                        setTimeout(function () {
                            currentGift = 2;
                        }, 500);
                    }
                    if (currentGift == 2) {
                        showPage(3);
                    }
                }
            }, totimes);
        });
        function tapmoveHandler(e) {
            clearTimeout(timeout);
            e.preventDefault();
            x2 = (hastouch ? e.targetTouches[0].pageX : e.clientX) - canvas.offsetLeft - $(".pages")[0].offsetLeft;
            y2 = (hastouch ? e.targetTouches[0].pageY : e.clientY) - canvas.offsetTop - $(".pages")[0].offsetTop;
            context.save();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
            context.restore();

            x1 = x2;
            y1 = y2;
        }
    })
}
