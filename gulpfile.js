var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles',function(){
  gulp.src('./src/styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(notify({message: 'Style task complete'}))

})

gulp.task('scripts',function(){
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(notify({message: 'Scripts task complete'}))
})


gulp.task('images',function(){
  gulp.src('./src/images/**/*')
  .pipe(imagemin({ optimizationLevel: 1, progressive: true, interlaced: true }))
  .pipe(gulp.dest('./dist/assets/img'))
  .pipe(notify({message: 'Images task complete'}))
})


gulp.task('clean',function(cb){
  del(['./dist'],cb)
})


gulp.task('default',['clean'],function(){
  gulp.start('styles','scripts','images');
})

gulp.task('watch',function(){
  gulp.watch('./src/styles/**/*.scss',['styles']);
  gulp.watch('./src/scripts/**/*.js',['scripts']);
  gulp.watch('./src/images/**/*',['images']);
})

