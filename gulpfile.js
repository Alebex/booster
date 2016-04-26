'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		sourcemaps = require('gulp-sourcemaps'),
		browserSync = require('browser-sync').create(),
		imagemin = require('gulp-imagemin'),
		wiredep = require('wiredep').stream,
		useref = require('gulp-useref'),
		gulpif = require('gulp-if'),
		uglify = require('gulp-uglify'),
		minifyCss = require('gulp-minify-css'),
		clean = require('gulp-clean'),
		sftp = require('gulp-sftp');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// ===========================
// 	Log Errors
// ===========================
function errorlog(err){

	console.error(err.message);
	this.emit('end');

};

// ===========================
// 	Styles
// ===========================
gulp.task('styles', function () {

	return gulp.src('app/sass/*.scss')
		.pipe(gulpif(isDevelopment, sourcemaps.init()))
		.pipe(sass())//{outputStyle: 'compressed'}
		.on('error', errorlog)
		.pipe(autoprefixer({
			browsers: ["last 50 versions", "> 1%", "safari 5", "ie 8", "ie 9"],
			cascade: false
		}))
		.pipe(gulpif(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest('app/css'))

});

// ===========================
// 	Bower Components
// ===========================
gulp.task('bower', function () {
	gulp.src('./app/index.html')
	.pipe(wiredep({
		directory: "app/bower_components/"
	}))
	.pipe(gulp.dest('./app'));
});

// ===========================
// 	Browser Sync
// ===========================
gulp.task('serve', function() {

	browserSync.init({
		server: 'app'
	});
	browserSync.watch('./app/**/*.{html,css,js}').on('change', browserSync.reload);

});

// ===========================
// 	Build
// ===========================
// Clean
gulp.task('clean', function () {

	return gulp.src('app/dist', {read: false})
		.pipe(clean());

});
// build
gulp.task('html', ['clean'], function () {

	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('dist'));

});

// ===========================
// 	Build: Image Optimization
// ===========================
gulp.task('img', function() {

	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.on('error', errorlog)
		.pipe(gulp.dest('dist/img'));

});
// ===========================
// 	Build: Sftp pull
// ===========================
// gulp.task('sftp', function () {

// 	return gulp.src('src/*')
// 		.pipe(sftp({
// 			host: 'website.com',
// 			user: 'user_name',
// 			pass: 'user_pass',
// 			removePath: 'path/to/folder/in/host'
// 		}));

// });

// ===========================
// 	Watch
// ===========================
gulp.task('watch', function() {

	gulp.watch('app/sass/*.scss', ['styles']);
	gulp.watch('bower.json', ['bower']);

});

gulp.task('default', ['watch', 'styles', 'bower', 'serve']);

// 1. NODE_ENV=production gulp styles
// 2. gulp build
gulp.task('build', ['html']); //, 'img'