var SEG = {
    giftOpacity: 100,
    currentPage: 1,
    formData: { name: "", age: 0, phone: 0 }
};

$(function () {
    document.addEventListener('touchmove', function (e) {
        if (SEG.currentPage != 5 && SEG.currentPage != 2) {
            e.preventDefault();
        }
    }, false);

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
        $(".page-6 .phone-number").html("手机号：" + SEG.formData.phone);//为了后面显示用

        //这里发出ajax请求，并对返回的json进行判断，如果正确的话进行下面两行的操作，否则，不进行任何操作。

        showPage(6);
        $(".page-5 .form").addClass("hide");
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
        showPage(1);
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
        if (pageNumber == 2) {
            var canvas1 = $("#cas")[0];
            var ctx1 = canvas1.getContext("2d");
            canvas1.width = $(".bottom-layer").width();
            canvas1.height = $(".bottom-layer").height();
            var img1 = new Image();
            img1.src = "img/page_2/cup.jpg";
            img1.onload = function () {
                ctx1.drawImage(img1, 0, 0, canvas1.width, canvas1.height);
                tapClip(canvas1, ctx1, 1);
            };

            var canvas2 = $("#cas2")[0];
            var ctx2 = canvas2.getContext("2d");
            canvas2.width = $(".bottom-layer").width();
            canvas2.height = $(".bottom-layer").height();
            var img2 = new Image();
            img2.src = "img/page_2/socks.jpg";
            img2.onload = function () {
                ctx2.drawImage(img2, 0, 0, canvas2.width, canvas2.height);
                tapClip(canvas2, ctx2, 2);
            }
        }
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

function tapClip(canvas, ctx, index) {
    var x1, y1, a = 10, timeout, totimes = 100, jiange = 10;
    var hastouch = "ontouchstart" in window ? true : false,
        tapstart = hastouch ? "touchstart" : "mousedown",
        tapmove = hastouch ? "touchmove" : "mousemove",
        tapend = hastouch ? "touchend" : "mouseup";

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = a * 2;
    ctx.globalCompositeOperation = "destination-out";

    canvas.addEventListener(tapstart, function (e) {
        clearTimeout(timeout)
        e.preventDefault();
        x1 = (hastouch ? e.targetTouches[0].pageX : e.clientX) - canvas.offsetLeft - $(".pages")[0].offsetLeft;
        y1 = (hastouch ? e.targetTouches[0].pageY : e.clientY) - canvas.offsetTop - $(".pages")[0].offsetTop;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        canvas.addEventListener(tapmove, tapmoveHandler);
        canvas.addEventListener(tapend, function () {
            canvas.removeEventListener(tapmove, tapmoveHandler);

            timeout = setTimeout(function () {
                var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var dd = 0;
                for (var x = 0; x < imgData.width; x += jiange) {
                    for (var y = 0; y < imgData.height; y += jiange) {
                        var i = (y * imgData.width + x) * 4;
                        if (imgData.data[i + 3] > 0) {
                            dd++;
                        }
                    }
                }
                if (dd / (imgData.width * imgData.height / (jiange * jiange)) < 0.4) {
                    if (index == 1) {
                        $("#cas").addClass("hide");
                        $(".bottom-layer").attr("src", "img/page_2/page_3_bg.jpg");
                        $("#cas2").removeClass("hide");
                    }
                    else {
                        $("#cas2").addClass("hide");
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
            ctx.save();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();

            x1 = x2;
            y1 = y2;
        }
    })
}
