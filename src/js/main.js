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

//fullpage.js flag to handle smooth responsiveness
var fullPageCreated = false;

//fullpage options object
var fullPageOptions = {
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
            showMenuNav();
        }
    },
    afterLoad: function(anchorLink, index){
        $(window).scroll();
        if(index == 1){
            hideMenuNav();
        }
    },
    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
        $(window).scroll();
    }
};

//INIT
//Handling the init and destroy of fullpage.js
$(function(){
    var $blocks = $('.animBlock.notViewed');
    var $window = $(window);
    $window.on('scroll', function(e){
        $blocks.each(function(i,elem){
            if($(this).hasClass('viewed'))
                return;
            isScrolledIntoView($(this));
        });
    });

    refreshFullPageJs();
    $(window).resize(function() {
        $(window).scroll();
        refreshFullPageJs();
    });
    //fire scroll event to get the first page to animate without relying onf fullpage.js callback
    $(window).scroll();
});

//initiate fullpage if not initiated
function createFullpage() {
    if(fullPageCreated === false) {
        fullPageCreated = true;
        $('#fullpage').fullpage(fullPageOptions);
    }
}

//check viewport width
function refreshFullPageJs() {
    if ($(window).width() <= 600) {
        if(fullPageCreated) {
            fullPageCreated = false;
            $.fn.fullpage.destroy('all');
        }
    }
    if ($(window).width() > 601) {
        createFullpage();
    }
}

//menu
function hideMenuNav() {
    if ($('#menu').is(":visible")) {
        $('#menu').animateCss('slideOutLeft', function () {
            $('#menu').addClass('hidden');
            $('#menubars').show().animateCss('slideInLeft');
        });
    }
}
function hideSmallMenuNav() {
    if($('#smallmenu').is(":visible")) {
        $('#smallmenu').animateCss('slideOutLeft', function () {
            $('#smallmenu').addClass('hidden');
            $('#smallmenubars').show().animateCss('slideInLeft');
        });
    }
}
function showMenuNav() {
    if (!$('#menu').is(":visible")) {
        $('#menu').removeClass('hidden').animateCss('slideInLeft');
        $('#menubars').hide();
    }
}
function showSmallMenuNav(){
    if(!$('#smallmenu').is(":visible")) {
        $('#smallmenu').removeClass('hidden').animateCss('slideInLeft');
        $('#smallmenubars').hide();
    }
}

$('#menubars').on('click', function(){
    showMenuNav();
});
$('#menuhide').on('click', function(){
    hideMenuNav();
});
$('#smallmenubars').on('click', function(){
    showSmallMenuNav();
});
$('#smallmenuhide').on('click', function(){
    hideSmallMenuNav();
});



var textillateElems = ['H1','H2','H3','H4','H5'];

function isElementInViewport (el) {
    el = el[0];
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemOffset = 0;
    if(elem.data('offset') != undefined) {
        elemOffset = elem.data('offset');
    }
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    if(elemOffset != 0) { // custom offset is updated based on scrolling direction
        if(docViewTop - elemTop >= 0) {
            // scrolling up from bottom
            elemTop = $(elem).offset().top + elemOffset;
        } else {
            // scrolling down from top
            elemBottom = elemTop + $(elem).height() - elemOffset
        }
    }
   // if((elemBottom >= docViewBottom) && (elemTop <= docViewTop)) {
        if(isElementInViewport($(elem))){
        //how about left to right?

            if($.inArray($(elem).prop('tagName'), textillateElems) !== -1) {
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



var chart = new Chartist.Bar('.ct-chart', {
    labels: [''],
    series: [
        [84]
    ]
}, {
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
chart.on('created', function() {
    $('.ct-series-a .ct-bar').addClass('notViewed animBlock').data('in-effect','fadeInLeft');
});

retinajs();