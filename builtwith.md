# Featured Technologies
> A detailed description of key technologies used to create the [Brian Moorman Project](README.md).

## Materialize
> http://materializecss.com/

Materialize is a front end framework based on Google's[Materialize Design](https://material.google.com/) which provides components, helper classes, a grid system and responsive support for websites and applications.  Materialize provides Sass support streamlining customization. 
    
The Brian Moorman project relies on Materialize's grid system as well as buttons and responsive support for layout and images.    
## Fullpage.js
> http://alvarotrigo.com/fullPage/

Fullpage.js is a JavaScript plugin that creates the full page effect as seen on larger displays.   Fullpage is highly configurable and supports many use cases.  

The Brian Moorman project instantiates Fullpage.js when the screen is wider than 600px and taller than 700px. 
## Font Awesome
> http://fontawesome.io/

Font Awesome provides font based icons. Serving icons as a font has many benefits including vector support allowing crisp and sharp display on any screen at any size as well as control and modification through CSS just like any other text.

Font Awesome icons are sprinkled throughout the Brian Moorman Project including the icons on each of the buttons.
## Animate.css
> https://daneden.github.io/animate.css/

Animate.css provides prebuilt cross browser CSS based animations that can be controlled through classes placed on DOM elements.

The Brian Moorman Project requires control of the timing of the animations as they are not fired until they are scrolled into view.   To accomplish this jQuery has been extended to provide an `animateCss` function which, when called, appropriately applies the classes to the element and optionally fires a callback function upon animation completion.

## Textillate.js
> http://textillate.js.org/

Textillate is a jQuery plugin that applies the animations provided by Animate.css to the individual characters and words of a string.  This plugin depends on Animate.css.    

Textillate is leveraged in the Brian Moorman Project on all of the headers including the site's `h1` tag and each section's `h2`, `h3` and `h4` tags.
## Chartist.js
> https://gionkunz.github.io/chartist-js/

Chartist.js provides support for generating SVG based charts using JavaScript.   SVG based charts provide many benefits over image or canvas based charts including vector based display and CSS control of the chart elements.  In addition each chart element in an SVG based chart is exposed in the DOM. 

Chartist.js is used in the Brian Moorman Project to generate the bar chart displaying the longest punt in the athlete section.

## Retina.js
> https://imulus.github.io/retinajs/

Retina.js checks the resolution support of the current device and will swap out lower resolution images with their higher resolution counterparts if supported.  This reduces overhead on lower resolution devices.


In the Brian Moorman Project the images that have a higher resolution option available are marked with a `data-rjs` parameter which signals to Retina.js to load in the[@2x](https://developer.apple.com/library/ios/documentation/2DDrawing/Conceptual/DrawingPrintingiOS/SupportingHiResScreensInViews/SupportingHiResScreensInViews.html#//apple_ref/doc/uid/TP40010156-CH15-SW1) version of the image if supported. 

```
public
 │
 └───img
        childrenshopital.png --------> 25 kb
        childrenshopital@2x.png -----> 93 kb
        ...
```
In the above case Retina.js saves 68 kb of overhead on a single image load on screens that only support standard resolution while maintaining support for high resolution screens.


## Gulp.js
>https://github.com/gulpjs/gulp

The Brian Moorman Project is built on[npm](https://www.npmjs.com/) and leverages[gulp.js](https://github.com/gulpjs/gulp) to build the public files from the source files.   Below are the key packages used to generate the Brian Moorman Project. 
#### gulp-bower
Loads the project's Bower packages

#### gulp-jshint
Validates JavaScript

#### gulp-uglify
Minifies JavaScript

#### gulp-sass
Compiles Sass into CSS

#### gulp-concat
Combines multiple files into one 

#### gulp-cssnano
Minifies CSS

#### gulp-md5
Renames files based on MD5 checksum

#### gulp-inject
Inserts javascript files and CSS stylesheets into the final html files

