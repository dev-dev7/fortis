jQuery(function($){
	"use strict";

	$.fn.extend({
        scrollToMe: function(){
            if($(this).length){
                var top = $(this).offset().top - 100;
                $('html,body').animate({scrollTop: top}, 600);
            }
        },
        scrollToJustMe: function(){
            if($(this).length){
                var top = $(this).offset().top;
                $('html,body').animate({scrollTop: top}, 600);
            }
        }
    });

    $(document).ready(function() {
        
        // init Page Loader
        setTimeout(function(){
            $('body').addClass('loaded');
        }, 10);

        // init Slick Carousel
        $(".slick-carousel").each(function(){
            var slick_config = $(this).data("slick");
            $(this).slick(slick_config);
        });

        $(".countdown").each(function(){
            var finaldate = moment.tz($(this).data("finaldate"), $(this).data("timezone"));
            $(this).countdown(finaldate.toDate(), function(event) {
                $(this).html(event.strftime('<span class="days"><span>%D</span><span>days</span></span><span class="hours"><span>%H</span><span>hours</span></span><span class="min"><span>%M</span><span>min</span></span><span class="sec"><span>%S</span><span>sec</span></span>'));
            });
        });

        $(".no-ui-slider").each(function(){
            var slider_id = $(this).attr("id");
            var slider = document.getElementById(slider_id);
            var min = $(this).data("min");
            var max = $(this).data("max");
            noUiSlider.create(slider, {
                start: [min, max],
                connect: true,
                step: 1,
                orientation: 'horizontal', // 'horizontal' or 'vertical'
                range: {
                    'min': min,
                    'max': max
                },
                format: wNumb({
                    decimals: 0
                })
            });
            slider.noUiSlider.on('update', function(values, handle){
                $("#"+slider_id).parent().find(".slider-label > span").text("$" + Math.round(values[0]) + " — " + "$" + Math.round(values[1]));
            });
        });

        $(".swatches [class*=attribute-]").on("click", function(){
            if(!$(this).hasClass("active")) {
                $(this).parent().parent().find("[class*=attribute-]").removeClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });

        $(".qty-holder").each(function(){
            $(this).find(".qty-inc").off("click").on("click", function(){
                $(this).parent().parent().find(".qty-text").val($(this).parent().parent().find(".qty-text").val() * 1 + 1);
            });
            $(this).find(".qty-dec").off("click").on("click", function(){
                if($(this).parent().parent().find(".qty-text").val() > 1)
                    $(this).parent().parent().find(".qty-text").val($(this).parent().parent().find(".qty-text").val() * 1 - 1);
            });
            $(this).find(".numbers-only").off("keyup").on("keyup", function(){
                this.value = this.value.replace(/[^0-9\.]/g,'');
            });
        });

        $(".snt-accordion").each(function(){
            $(this).find(".item-header").off("click").on("click",function(){
                if($(this).parent().hasClass("active"))
                    $(this).parent().removeClass("active");
                else
                    $(this).parent().addClass("active");
            });
        });

        $('select').each(function(){
            $(this).formSelect();
        });

        $('.snt-tab').each(function(){
            $(this).find('ul.tab a').on("click", function(){
                $(this).parent().parent().find('a').removeClass("active");
                $(this).addClass("active");
                $($(this).attr("href")).parent().children("div").removeClass("active");
                $($(this).attr("href")).addClass("active");

                return false;
            });
        });

        $('.page-header a.burger').on("click", function(){
            if($("body").hasClass("offcanvas-open")){
                $("body").removeClass("offcanvas-open");
            } else {
                $("body").addClass("offcanvas-open");
            }
        });

        $('.overlay, .side-mobile-menu a.close').on("click", function(){
            $("body").removeClass("offcanvas-open");
        });

        $('.radio-accordion .item-title > label').on("click", function(){
            if($(this).find("input[type=radio]").prop("checked") && !$(this).parent().hasClass("active")) {
                $(this).parent().parent().parent().find(".item-title.active + .item-content").slideUp();
                $(this).parent().parent().parent().find(".item-title").removeClass("active");
                $(this).parent().addClass("active");
                $(this).parent().parent().children(".item-content").slideDown();
            }
        });

        if($('.snt-paroller').length) {
            $('.snt-paroller').paroller();
        }

        if($(".product-view.style04").length) {
            var product_info_top = 0;
            var product_image_box_pos = $(".product-view.style04 .product-media").offset().top;

            function StickyProductDetail(){
                product_image_box_pos = $(".product-view.style04 .product-media").offset().top;
                if($(window).innerWidth() >= 992) {
                    $(".product-view.style04 .product-detail").each(function(){
                        if(($(window).scrollTop() > product_image_box_pos - 50) && (product_image_box_pos + $(".product-view.style04 .product-media").outerHeight()) > ($(window).scrollTop() + $(this).outerHeight() + 50)) {
                            product_info_top = $(window).scrollTop() - product_image_box_pos + 50;
                            $(this).css('top',product_info_top + 'px');
                        } else if ($(window).scrollTop() < product_image_box_pos || $(".product-view.style04 .product-media").outerHeight() < $(this).outerHeight()) {
                            product_info_top = 0;
                            $(this).css('top',product_info_top + 'px');
                        } else {
                            product_info_top = $(".product-view.style04 .product-media").outerHeight() - $(this).outerHeight();
                            $(this).css('top',product_info_top + 'px');
                        }
                    });
                } else {
                    product_info_top = 0;
                    $(".product-view.style04 .product-detail").css('top',product_info_top + 'px');
                }
            }

            StickyProductDetail();

            $(window).scroll(function(){
                StickyProductDetail();
            });

            $(window).resize(function(){
                StickyProductDetail();
            });
        }

        $('.counter').each(function () {
            $(this).prop('counter',0).animate({
                counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                }
            });
        });

        $('.category-links.category-with-image > a').on("mousemove", function(event){
            if($(this).attr("src") != $(this).data('img'))
                $(".category-links.category-with-image > img").attr("src", $(this).data('img'));
            $(".category-links.category-with-image > img").addClass("visible");
            $(".category-links.category-with-image > img").css("left",event.clientX + "px");
            $(".category-links.category-with-image > img").css("top",event.clientY + "px");
        });

        $('.category-links.category-with-image > a').on("mouseout", function(event){
            $(".category-links.category-with-image > img").removeClass("visible");
        });

        $('.snt-menu li.megamenu-tab > .sub-menu > li').on("mouseover", function(){
            $(this).parent().children('li').removeClass('show-tab');
            $(this).addClass('show-tab');
        });

        $('.side-mobile-menu .submenu-opener').on('click', function(){
            if($(this).prev('ul').hasClass('opened')) {
                $(this).prev('ul').slideUp();
                $(this).prev('ul').removeClass('opened');
            } else {
                $(this).prev('ul').slideDown();
                $(this).prev('ul').addClass('opened');
            }
        });

        $('.side-mobile-menu a').on('click', function(){
            if($(this).attr("href") == "#" || $(this).attr("href") == "javascript:void(0)"){
                if($(this).parent().children('ul').hasClass('opened')) {
                    $(this).parent().children('ul').slideUp();
                    $(this).parent().children('ul').removeClass('opened');
                } else {
                    $(this).parent().children('ul').slideDown();
                    $(this).parent().children('ul').addClass('opened');
                }

                return false;
            }
        });
    });

    /*global Sly */

    // Detect IE.
    // Feature detection of "transform-style: preserve-3d" doesn't work, so this
    // is the only way how to fall back to a 2D front page example in IE that
    // doesn't have a full support of 3D transforms across the board.
    document.getElementsByTagName('html')[0].className += ' ' +
        (~window.navigator.userAgent.indexOf('MSIE') ? 'ie' : 'no-ie');

    $('.sly-carousel').each(function(){
        var $frame = $(this).find('.frame'); window.frr = $frame;
        var sly = new Sly($frame, {
            horizontal: 1,
            itemNav: 'forceCentered',
            activateMiddle: 1,
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 10,
            scrollBar: $(this).find('.scrollbar'),
            scrollBy: 1,
            activatePageOn: 'click',
            speed: 200,
            moveBy: 600,
            elasticBounds: 1,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1
        }).init();
    });
});