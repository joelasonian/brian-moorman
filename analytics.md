# Google Analytics
> Highlighting the analytics incorporated in the[Brian Moorman Project](README.md).
The Brian Moorman Project is capturing page views, events and goal conversions using Google Analytics.  

## Page Views
> Defining a page

####  A little customization required
The Brian Moorman project is delivered to the browser in one HTTP GET request.   If we used Google Analytics out of the box we would only register one page view for the entire site which would not provide the detailed and in-depth analytical information Google Analytics can provide.  To register our page views we must first define what pages we are looking to track and programatically register those page views as they occur.
#### Defining the pages
For the purposes of this site we are defining our pages as the sections of content.
* \#start
* \#athlete
* \#giver
* \#hero
* \#act

#### Extending jQuery
To track the page view we will extend jQuery to include a simple chainable function called `trackThis` which looks to see if `data('track-page')` has a value and if so send the value as a page view to Google Analytics.
```
$.fn.extend({
    ...
    
    trackThis: function(){
        if ($(this).data('track-page')){
            ga('send', 'pageview', $(this).data('track-page'));
        }
        return this;
     }
     
     ...
})
```

#### Assigning page label to header tags
At the top of each content section exists a section header in an `h2` tag.  When this header is scrolled into the viewport it is animated in.   We want to hook into that animation call and fire the jQuery `trackThis` function.  
For each section we add the `data-track-page` parameter with the value of the page view to track.
```
<h2 ... data-track-page="#giver">A Giver</h2>
```

#### Hooking in
The `trackThis` function is available when chaining jQuery functions together on a selection.  So by chaining the function into the animation call we are able to successfully track the page view. 
```
$(elem).removeClass('notViewed').addClass('viewed').trackThis().animateCss('fadeInUp');
```

This code is only fired once (when animating on) - which means we will only send the page view once for this user on this page load.   If we wanted to track multiple page views in one page load we would modify the script to fire the `trackThis` method every time it came into the viewport.

## Events
> Defining events to capture

For the purposes of this site we are capturing the click event on the buttons within the Act Now section.
We are sending the event to Google Analytics via jQuery.

To set up event capture on an element in HTML we are adding a class of `eventtrack` to the anchor tag.   In addition data parameters are included that detail the category, action and label.

Example HTML:
```
<a href="https://twitter.com/brianmoorman" class="eventtrack" data-category="button" data-action="click" data-label="Follow Brian Moorman (Twitter)" target="_blank"><i class="fa fa-twitter left" aria-hidden="true"></i> Follow Brian Moorman</a>
```

the jQuery that is tracking the event:
```
$('.eventtrack').on('click',function(e){
    ga('send', 'event', $(this).data('category'), $(this).data('action'), $(this).data('label'));
});
```

*NOTE:* This jQuery listener works because the anchor tag has a target of "_blank" which means the new page is opened in a new window and the current page won't be lost and the event tracking will be able to finish its execution.

When tracking outbound links that open in the same window the function will have to intercept the click, register the event and programatically send the user to the new location via Google Analytics `hitCallback`.  Such a function might look something more like this:
```
$('.eventtrack').on('click',function(e){
    e.preventDefault();
    var urlToNav = $(this).attr('href');
    ga('send', 'event', $(this).data('category'), $(this).data('action'), $(this).data('label'),{
          'hitCallback': function() {
              window.document.location = urlToNav;
          }
     });
});
```

## Goal Conversions
> Defining a page

For the purposes of this site we have defined two goals
* View the Act Section
* Take Action

These goals have been configured in the Google Analytics Admin panel.  

#### View the Act section
A custom goal that is based on destination.  This goal is considered achieved when the user registers the /#act page view.   This goal has also been configured to track the funnel across all sections.

#### Take Action
The take action is an event based goal and is considered achieved upon clicking one of the Take Action buttons in the /#act section.
