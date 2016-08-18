;
var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var md5 = require("gulp-md5");

gulp.task('initclean',function(){
    return del(['dist/public/*']);
});

// Process Sass
gulp.task('sass', ['initclean'], function() {
   return gulp.src([
        'src/sass/app.scss'
    ]).pipe(sass())
        .pipe(concat('all.css'))
        .pipe(rename('all.min.css'))
        .pipe(cssnano())
        .pipe(md5())
        .pipe(gulp.dest('dist/public/css'));
});

//copy bower elements
gulp.task('copy-bower-scripts',['initclean'], function(){
    gulp.src(['src/bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/public/js/'));
    return gulp.src([
        //"src/bower_components/jquery/dist/jquery.min.js",
        //"src/bower_components/jquery-form/jquery.form.js",
        //"src/bower_components/jquery-validation/dist/jquery.validate.min.js",
        "src/bower_components/Materialize/dist/js/*.min.js",
        "src/bower_components/fullpage.js/dist/jquery.fullpage.min.js",
        "src/bower_components/letteringjs/jquery.lettering.js",
        "src/bower_components/textillate/jquery.textillate.js",
        "src/bower_components/chartist/dist/chartist.min.js",
        "src/bower_components/retinajs/dist/retina.min.js"
    ])
        .pipe(concat('vendor.js'))
        //.pipe(gulp.dest('dist'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(md5())
        .pipe(gulp.dest('dist/public/js/'));
});
gulp.task('copy-bower-styles',['initclean'], function(){
    return gulp.src([
        "src/bower_components/fullpage.js/dist/jquery.fullpage.min.css",
        "src/bower_components/animate.css/animate.min.css",
        "src/bower_components/chartist/dist/chartist.min.css"
    ])
        .pipe(concat('vendor.css'))
        .pipe(rename('vendor.min.css'))
        .pipe(cssnano())
        .pipe(md5())
        .pipe(gulp.dest('dist/public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts',['initclean'], function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        //.pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(md5())
        .pipe(gulp.dest('dist/public/js'))
});

gulp.task('copy-elements', ['initclean'], function(){
    //FONTS
    gulp.src([
        "src/bower_components/Materialize/dist/fonts/**/*",
        "src/bower_components/font-awesome/fonts/**/*"
    ])
        .pipe(gulp.dest('dist/public/fonts/'));
    //IMAGES
    return gulp.src(['src/img/*'])
        .pipe(gulp.dest('dist/public/img'));
});



//inject
gulp.task('inject', ['copy-bower-scripts','copy-bower-styles','scripts','sass'], function(){
    var target = gulp.src('src/view/**/*.{html,php}');
    var sources = gulp.src([
        'js/vendor*.js',
        'js/all*.js',
        '!js/jquery.min.js',
        'css/vendor*.css',
        'css/all*.css'
    ], {read: false, cwd: __dirname + '/dist/public'});
    return target.pipe(inject(
        sources,
        {
            removeTags: true,
            addRootSlash: true
        })
    ).pipe(gulp.dest('dist/public'));
});


var tasklist = [
    'initclean',
    'sass',
    'scripts',
    'copy-elements',
    'copy-bower-scripts',
    'copy-bower-styles',
    'inject'
];

gulp.task('default', tasklist);
gulp.task('watch',function(){
    gulp.watch([
        'src/**/*.{html,php,scss,js}'
    ],tasklist)
});