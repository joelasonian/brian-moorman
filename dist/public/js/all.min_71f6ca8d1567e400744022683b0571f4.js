function createFullpage(){fullPageCreated===!1&&(fullPageCreated=!0,$(".navDownArrow").removeClass("hide"),$("#fullpage").fullpage(fullPageOptions))}function refreshFullPageJs(){($(window).width()<=600||$(window).height()<=700)&&fullPageCreated&&(fullPageCreated=!1,$(".navDownArrow").addClass("hide"),$.fn.fullpage.destroy("all")),$(window).width()>601&&$(window).height()>701&&createFullpage()}function hideMenuNav(){$("#menu").is(":visible")&&$("#menu").animateCss("slideOutLeft",function(){$("#menu").addClass("hidden"),$("#menubars").show().animateCss("slideInLeft")})}function hideSmallMenuNav(){$("#smallmenu").is(":visible")&&$("#smallmenu").animateCss("slideOutLeft",function(){$("#smallmenu").addClass("hidden"),$("#smallmenubars").show().animateCss("slideInLeft")})}function showMenuNav(){$("#menu").is(":visible")||($("#menu").removeClass("hidden").animateCss("slideInLeft"),$("#menubars").hide())}function showSmallMenuNav(){$("#smallmenu").is(":visible")||($("#smallmenu").removeClass("hidden").animateCss("slideInLeft"),$("#smallmenubars").hide())}function isElementInViewport(e){e=e[0];var n=e.getBoundingClientRect();return n.top>=0&&n.left>=0&&n.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&n.right<=(window.innerWidth||document.documentElement.clientWidth)}function isScrolledIntoView(e){var n=$(window).scrollTop(),i=(n+$(window).height(),0);void 0!=e.data("offset")&&(i=e.data("offset"));var a=$(e).offset().top,t=a+$(e).height();if(0!=i&&(n-a>=0?a=$(e).offset().top+i:t=a+$(e).height()-i),isElementInViewport($(e))){if($.inArray($(e).prop("tagName"),textillateElems)!==-1){var l=$(e).data("in-delay")?$(e).data("in-delay"):0,s=$(e).data("in-char-delay")?$(e).data("in-char-delay"):50;$(e).removeClass("notViewed").addClass("viewed").textillate({initialDelay:l,in:{delay:s}})}else{var o=$(e).data("in-effect")?$(e).data("in-effect"):"fadeInUp";$(e).removeClass("notViewed").addClass("viewed").animateCss(o)}var d=$(".animBlock.notViewed").length;0==d&&$(window).off("scroll")}}$.fn.extend({animateCss:function(e,n){var i="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";$(this).addClass("animated "+e).one(i,function(){if($(this).removeClass("animated "+e),$.isFunction(n))return n()})}});var fullPageCreated=!1,fullPageOptions={anchors:["start","athlete","giver","hero","act"],menu:"#menu",autoScrolling:!0,css3:!0,scrollingSpeed:1e3,verticalCentered:!0,fitToSection:!0,slidesNavigation:!0,slidesNavPosition:"bottom",onLeave:function(e,n,i){1==e&&showMenuNav()},afterLoad:function(e,n){$(window).scroll(),1==n&&hideMenuNav()},afterSlideLoad:function(e,n,i,a){$(window).scroll()}};$(function(){$(".next").on("click",function(){$(window).scroll()});var e=$(".animBlock.notViewed"),n=$(window);n.on("scroll",function(n){e.each(function(e,n){$(this).hasClass("viewed")||isScrolledIntoView($(this))})}),refreshFullPageJs(),$(window).resize(function(){$(window).scroll(),refreshFullPageJs()}),$(window).scroll()}),$("#menubars").on("click",function(){showMenuNav()}),$("#menuhide").on("click",function(){hideMenuNav()}),$("#smallmenubars").on("click",function(){showSmallMenuNav()}),$("#smallmenuhide").on("click",function(){hideSmallMenuNav()});var textillateElems=["H1","H2","H3","H4","H5"],chart=new Chartist.Bar(".ct-chart",{labels:[""],series:[[84]]},{height:"100px",axisX:{type:Chartist.FixedScaleAxis,low:0,high:100,ticks:[0,10,20,30,40,50,60,70,80,90,100]},reverseData:!0,horizontalBars:!0});chart.on("created",function(){$(".ct-series-a .ct-bar").addClass("notViewed animBlock").data("in-effect","fadeInLeft")}),retinajs();