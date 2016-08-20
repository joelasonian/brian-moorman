;
"use strict";
//extend jquery
$.fn.extend({
    animateCss: function (animationName, callBack) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if ($.isFunction(callBack)){
                return callBack();
            }
        });
    }
});

var brian = function(){
    //protected variables
    util = {
        //fullpage.js flag to handle smooth responsiveness
        fullPageCreated:false,
        //fullpage options object
        fullPageOptions : {
            anchors: ['start', 'athlete', 'giver', 'hero', 'act'],
            menu: '#menu',
            autoScrolling: true,
            css3: true,
            scrollingSpeed: 1000,
            verticalCentered: true,
            fitToSection: true,
            slidesNavigation: true,
            slidesNavPosition: 'bottom',
            onLeave: function(index, nextIndex, direction){
                if(index == 1){
                    brian.showMenuNav();
                }
            },
            afterLoad: function(anchorLink, index){
                $(window).scroll();
                if(index == 1){
                    brian.hideMenuNav();
                }
            },
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                $(window).scroll();
            }
        },
        textillateElems :['H1','H2','H3','H4','H5'],
        chart : false
    };
    //public variables and methods
    return {
        init : function(){
            //INIT
            //Handling the init and destroy of fullpage.js
            $(function(){
                $('.next').on('click', function(){
                    $(window).scroll();
                });
                var $blocks = $('.animBlock.notViewed');
                var $window = $(window);
                $window.on('scroll', function(e){
                    $blocks.each(function(i,elem){
                        if($(this).hasClass('viewed'))
                            return;
                        brian.isScrolledIntoView($(this));
                    });
                });
                brian.refreshFullPageJs();
                $(window).resize(function() {
                    $(window).scroll();
                    brian.refreshFullPageJs();
                });
                //fire scroll event to get the first page to animate without relying on fullpage.js callback
                $(window).scroll();
                //initiate Menus
                $('#menubars').on('click', function(){
                    brian.showMenuNav();
                });
                $('#menuhide').on('click', function(){
                    brian.hideMenuNav();
                });
                $('#smallmenubars').on('click', function(){
                    brian.showSmallMenuNav();
                });
                $('#smallmenuhide').on('click', function(){
                    brian.hideSmallMenuNav();
                });

                util.chart = new Chartist.Bar('.ct-chart', {
                    labels: [''],
                    series: [
                        [84]
                    ]
                }, {
                    height: '100px',
                    axisX : {
                        type : Chartist.FixedScaleAxis,
                        low : 0,
                        high : 100,
                        ticks : [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ]
                    },
                    reverseData: true,
                    horizontalBars: true,
                });

                // Once the chart is fully created we reset the sequence
                util.chart.on('created', function() {
                    // $('.ct-series-a .ct-bar').addClass('notViewed animBlock').data('in-effect','fadeInLeft');
                });
                //initiate retina.js
                retinajs();

            });
        },
        refreshFullPageJs : function(){
            if (($(window).width() <= 600) || ($(window).height() <= 700)) {
                if(util.fullPageCreated) {
                    $('#smallmenuwrap').removeClass('hide');
                    util.fullPageCreated = false;
                    $('.navDownArrow, .navbutton, #menuwrap').addClass('hide');
                    $.fn.fullpage.destroy('all');
                }
            }
            if (($(window).width() > 601) && ($(window).height() > 701)) {
                brian.createFullPage();
            }
        },
        createFullPage: function(){
            if(util.fullPageCreated === false) {
                util.fullPageCreated = true;
                $('#smallmenuwrap').addClass('hide');
                $('.navDownArrow, .navbutton, #menuwrap').removeClass('hide');
                $('#fullpage').fullpage(util.fullPageOptions);
            }
        },
        hideMenuNav : function(){
            if ($('#menu').is(":visible")) {
                $('#menu').animateCss('slideOutLeft', function () {
                    $('#menu').addClass('hidden');
                    $('#menubars').show().animateCss('slideInLeft');
                });
            }
        },
        hideSmallMenuNav : function() {
            if($('#smallmenu').is(":visible")) {
                $('#smallmenu').animateCss('slideOutLeft', function () {
                    $('#smallmenu').addClass('hidden');
                    $('#smallmenubars').show().animateCss('slideInLeft');
                });
            }
        },
        showMenuNav: function() {
            if (!$('#menu').is(":visible")) {
                $('#menu').removeClass('hidden').animateCss('slideInLeft');
                $('#menubars').hide();
            }
        },
        showSmallMenuNav : function(){
            if(!$('#smallmenu').is(":visible")) {
                $('#smallmenu').removeClass('hidden').animateCss('slideInLeft');
                $('#smallmenubars').hide();
            }
        },
        isElementInViewport: function(el) {
            el = el[0];
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            );
        },
        isScrolledIntoView: function(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();

            // if((elemBottom >= docViewBottom) && (elemTop <= docViewTop)) {
            if(brian.isElementInViewport($(elem))){
                if($.inArray($(elem).prop('tagName'), util.textillateElems) !== -1) {
                    //TEXTILLATE
                    var animationdelay =  ($(elem).data('in-delay')) ? $(elem).data('in-delay') : 0 ;
                    var characterdelay =  ($(elem).data('in-char-delay')) ? $(elem).data('in-char-delay') : 50 ;
                    $(elem).removeClass('notViewed').addClass('viewed').textillate({initialDelay: animationdelay, in:{delay:characterdelay}});
                } else {
                    //ANIMATE
                    var animationname = ($(elem).data('in-effect')) ? $(elem).data('in-effect') :  'fadeInUp';
                    $(elem).removeClass('notViewed').addClass('viewed').animateCss(animationname);
                }
                var animElemsLeft = $('.animBlock.notViewed').length;
                if(animElemsLeft == 0){
                    // with no animated elements left debind the scroll event
                    $(window).off('scroll');
                }
            }
        }
    }
}();
brian.init();