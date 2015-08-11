// Load Plugins
var gulp = require('gulp'),
    //minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html'),
    minifyinline= require('gulp-minify-inline'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    imageop = require('gulp-image-optimization'),
    uncss = require('gulp-uncss'),
    //imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    //notify = require('gulp-notify'),
    cache = require('gulp-cache');
    //livereload = require('gulp-livereload'),
    //del = require('del');

// Styles
gulp.task('css', function () {
    gulp.src('css/*.css')
    .pipe(uglifycss())
    .pipe(gulp.dest('build/css/'));

});

gulp.task('css2', function () {
    gulp.src('views/css/bootstrap-grid.css')
    .pipe(uncss({html: ['views/pizza.html']}))
    .pipe(gulp.dest('build/views/css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('build/views/css/'));
    gulp.src('views/css/*.css')

        .pipe(uglifycss())
        .pipe(gulp.dest('build/views/css/'));
    


});

// Images
gulp.task('images', function(cb) {
    gulp.src(['img/**/*.png','img/**/*.jpg','img/**/*.gif','img/**/*.jpeg'])
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('build/img/')).on('end', cb).on('error', cb);
});

gulp.task('images2', function(cb) {
    
    gulp.src(['views/images/**/*.png','views/images/**/*.jpg','views/images/**/*.gif','views/images/**/*.jpeg'])
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('build/views/images')).on('end', cb).on('error', cb);
});

//HTML
gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(minifyinline())
    .pipe(gulp.dest('./build/'))
      .pipe(minifyhtml())
      .pipe(gulp.dest('./build/'));
});

gulp.task('html2', function() {
    gulp.src('./views/*.html')
        .pipe(minifyinline())
        .pipe(gulp.dest('./build/views/'))
        .pipe(minifyhtml())
        .pipe(gulp.dest('./build/views/'));
});


// Scripts
gulp.task('scripts', function() {
 gulp.src('js/*.js')
.pipe(uglify())
.pipe(gulp.dest('build/js/'));
}); 

gulp.task('scripts2', function() {
gulp.src('views/js/*.js')
.pipe(uglify())
.pipe(gulp.dest('build/views/js/'));
}); 

// Default task
gulp.task('default', function() {
gulp.start('css', 'css2', 'scripts', 'scripts2', 'images', 'images2', 'html', 'html2');
}); 
