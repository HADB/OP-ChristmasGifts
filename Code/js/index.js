var SEG = {
    giftOpacity: 100,
    currentPage: 1
};

$(function () {
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
        var phoneNumber = $(".page-5 .form .phone").val();
        $(".page-6 .phone-number").html("手机号：" + phoneNumber);

        //To send ajax

        showPage(6);
        $(".page-5 .form").addClass("hide");
    });

    $(".page-5 .form .age").click(function () {
        $(".page-5 .form .dropdown").removeClass("hide");
    });

    $(".page-5 .form .dropdown div").click(function (e) {
        if ($(e.target).hasClass("dropdown-age-1")) {
            console.log(1);
            $(".page-5 .form .age").html("18-25岁");
        }
        if ($(e.target).hasClass("dropdown-age-2")) {
            console.log(2);
            $(".page-5 .form .age").html("26-36岁");
        }
        if ($(e.target).hasClass("dropdown-age-3")) {
            console.log(3);
            $(".page-5 .form .age").html("36-45岁");
        }
        if ($(e.target).hasClass("dropdown-age-4")) {
            console.log(4);
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