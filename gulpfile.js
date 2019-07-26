var gulp = require('gulp');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var inlinesource = require('gulp-inline-source');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('autoprefixer');
var postCss = require('gulp-postcss');
var proxy = require('http-proxy-middleware');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace');
//  ----------------------------------------开发-----------------------------------------
// 起服务
gulp.task('connect', function() {
    connect.serverClose();
    connect.server({
        root: 'dist',
        livereload: true,
        
        port: 8099,
        // middleware: function(connect, opt) {
        //     // return [
        //     //     proxy('/printbox', {
        //     //         target: 'http://192.168.5.118:8891',
        //     //         changeOrigin: true
        //     //     })
        //     // ]
        // }
    });
});

// html文件
gulp.task('dev-html', function() {
    gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
    
});

// css文件
gulp.task('dev-less', ['dev-html'], function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .on('error', function(err) { // 解决编译出错，监听被阻断的问题
            console.log('Less Error!', err.message);
            this.end();
        })
        .pipe(postCss([autoprefixer({ browsers: ['last 2 versions'] })]))
        .pipe(gulp.dest('./dist/css'))
        .pipe(cleanCss())
        .pipe(connect.reload())
});
// js文件
gulp.task('dev-js', ['dev-html'], function() {
    gulp.src('./src/js/*.js')

    .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', function(err) { // 解决编译出错，监听被阻断的问题
            console.log('js Error!', err.message);
            this.end();
        })
        .pipe(sourcemaps.write('../maps')) //输出map文件
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())


});

// 图片
gulp.task('dev-img', function() {
    gulp.src('./src/img/*.*')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist'));
})


// 监控
gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['dev-html']);
    gulp.watch(['./src/js/*.js'], ['dev-js']);
    gulp.watch(['./src/css/*.less'], ['dev-less']);
    gulp.watch(['./src/img/*.*'], ['dev-img']);
});
//  ----------------------------------------开发-----------------------------------------

// -----------------------------------------打包-----------------------------------------
// html文件
gulp.task('build-html', function() {
    gulp.src('./src/*.html')
        .pipe(replace('./css/', '../dist/css/'))
        .pipe(replace('./js/', '../dist/js/'))
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
});

// css文件
gulp.task('build-less', ['build-html'], function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .on('error', function(err) { // 解决编译出错，监听被阻断的问题
            console.log('Less Error!', err.message);
            this.end();
        })
        .pipe(postCss([autoprefixer({ browsers: ['last 2 versions'] })]))
        .pipe(gulp.dest('./dist/css'))
        // .pipe(cleanCss())
        // .pipe(rename({ extname: '.min.css' }))
        // .pipe(gulp.dest('./dist/css/min'))
});
// js文件
gulp.task('build-js', ['build-html'], function() {
    gulp.src('./src/js/*.js')

    .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', function(err) { // 解决编译出错，监听被阻断的问题
            console.log('js Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('./dist/js'))

    .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js/min'))

});

// 图片
gulp.task('build-img', function() {
        gulp.src('./src/img/*.*')
            .pipe(gulp.dest('./dist'));
    })
    // -----------------------------------------打包-----------------------------------------

// 默认任务
gulp.task('dev', ['connect', 'watch', 'dev-js', 'dev-less', 'dev-img']);
gulp.task('build', ['build-js', 'build-less', 'dev-img']);
