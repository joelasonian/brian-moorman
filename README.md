# The Brian Moorman Project
> Also see [key technologies](builtwith.md) used to build the site and how[site analytics](analytics.md) have been incorporated.

## Installation
The Brian Moorman Project is built on[npm](https://www.npmjs.com/) and leverages[Gulp](https://github.com/gulpjs/gulp) to build the site from source files.  To install gulp globally please refer to Gulp's[getting started section](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

### Install the project dependencies
Load the gulp project dependencies
```shell
npm install
```
Load the[Bower](https://bower.io/) packages
```shell
gulp load-bower-components
```

### Document Root
The files generated by the gulp build process are placed in the public folder. 
```
brian-moorman
│
└───dist
   │
   └───public
```

### Editing the Brian Moorman Project
Edits to the site should be made in the /src directory as these are the files that will be used by gulp to build the site.
```
brian-moorman
│
└───src
   │
   └───img
   |       childrenshopital.png
   |       childrenshopital@2x.png
   |       ...
   |
   └───js
   |       main.js
   |       
   └───sass
   |       app.scss
   |       
   └───view
           index.html
```

### Build the site
> The gulp build process validates, concatenates and minifies the JavaScript and Sass files for the site.  The files are then injected into the html and renamed based on the MD5 checksum of the file.  This ensures all front end files are valid, cleaned, optimized and cached appropriately. 

To process all of the files and rebuild the site based on the current source files:
```shell
gulp
```
As you are developing the site you may find it handy to have gulp watch for changes on the html, scss and js files and build the site as changes are detected.
```shell
gulp watch
```

