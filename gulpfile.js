var gulp 			= require("gulp");
var sass 			= require("gulp-sass");
var htmlmin         = require('gulp-htmlmin');
var browserSync     = require('browser-sync').create();
var concat          = require('gulp-concat');
var notify          = require("gulp-notify");
var del             = require('del');


// Task Concatenar JS
gulp.task('concat', function() {
  return gulp.src('src/js/app.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});


//task delete cache css
gulp.task('cache:css', function() {
    del('./dist/css/style.css');
});

//Task mover fonts
gulp.task('move-font', function() {
    gulp.src('./src/font-icon/fonts/**')
    .pipe(gulp.dest('dist/fonts/'));
});

// Task Sass to Css
gulp.task('sass', ['cache:css'], function () {
  return gulp.src('./src/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .on('error', notify.onError({title: "erro scss", message: "<%= error.message %>"}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


// Task html minify
gulp.task('htmlmin' , function() {
	return gulp.src('./src/*.html')
		  .pipe(htmlmin({collapseWhitespace: true}))
		  .pipe(gulp.dest('./dist/'))
          .pipe(browserSync.stream());

});


// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./src/scss/*.scss",   ['sass']);
    gulp.watch("./src/*.html",      ['htmlmin']);
    
});



gulp.task('default', ['sass', 'htmlmin',  'serve']);


// .on('change', browserSync.reload  -  server: "./"







