/**
 * 自动化构建
 *
 * author：glasstea
 * create time:2016-10-27
 * 
 */
var gulp = require("gulp");
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
// var connect = require('gulp-connect');
var webserver = require('gulp-webserver');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// 拷贝基础库
gulp.task("copy:libs", function () {
    console.log('正在拷贝库和框架...');
    gulp.src([
        './node_modules/angular/**/*.*',
        './node_modules/jquery/dist/**/*.*',
        './node_modules/bootstrap/dist/**/*.*',
        './node_modules/angular-ui-router/release/**/*.*',
        './node_modules/angular-ui-bootstrap/dist/**/*.*',
        './node_modules/angular-animate/**/*.*'

    ], { base: 'node_modules' })
        .pipe(gulp.dest('./app/libs'))
});

// 编译CSS
gulp.task('compile:styles', function () {
    console.log('正在编译less文件到css文件...');
    var autoprefix = new LessPluginAutoPrefix({
        browsers: ["last 5 versions"],
        cascade: true
    });
    return gulp.src([
        './app/res/styles/less/**/*.less',
        '!./app/libs/**/*.less'
    ])
        .pipe(plumber())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./app/res/styles/css'))
        .on('end', function () {
            console.log('.less编译到app/res/styles/css文件夹')
        });
});

// 合并、拷贝CSS
gulp.task('combine:styles', ['compile:styles'], function () {
    console.log('正在移动css文件...');

    gulp.src('./app/res/styles/css/site.css')
        .pipe(gulp.dest('./dist/res/styles'))
        .on('end', function () {
            console.log('site.css放入./dist/res/styles文件夹')
        });

    gulp.src([
        './app/res/styles/css/**/*.css',
        '!./app/res/styles/css/site.css'
    ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./dist/res/styles'))
        .on('end', function () {
            console.log('css文件合并后放入./dist/res/styles文件夹')
        });
});

// 拷贝模板html
gulp.task('copy:tmpl', function () {
    gulp.src('./app/areas/**/*.tmpl.html')
        .pipe(gulp.dest('./dist/tmpls/'));
    gulp.src('./app/directives/**/*.tmpl.html')
        .pipe(gulp.dest('./dist/components/'))
});

// 拷贝资源
gulp.task('copy:res', ['copy:tmpl', 'combine:styles'], function () {
    console.log('正在拷贝资源...');
    gulp.src('./app/libs/**/*.*')
        .pipe(gulp.dest('./dist/libs'))
        .on('end', function () {
            console.log('第三方库拷贝到dist/libs目录')
        });

    gulp.src([
        './app/res/**/*.*',
        '!./app/res/styles/**/*.*'
    ], { base: 'app' })
        .pipe(gulp.dest('./dist'))
        .on('end', function () {
            console.log('样式资源拷贝到dist/res目录')
        });


    gulp.src([
        './app/index.html'
    ])
        .pipe(gulp.dest('./dist'))
        .on('end', function () {
            console.log('index页面拷贝到dist目录')
        });
});


// browserify
gulp.task("browserify", ['copy:libs', 'copy:res'], function () {
    console.log('正在打包JavaScript...');
    var b = browserify({
        entries: "./app/entry.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist"))
        .on('end', function () {
            console.log('browserify打包完成，bundle.js放入dist文件夹');
        });
});

// browserify（没有source map）
gulp.task("publish:browserify", ['copy:libs', 'copy:res'], function () {
    console.log('正在打包JavaScript...');
    var b = browserify({
        entries: "./app/entry.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(gulp.dest("./dist"))
        .on('end', function () {
            console.log('browserify打包完成，bundle.js放入dist文件夹');
        });
});

gulp.task('publish', ['publish:browserify'], function () {
    gulp.src('./dist/bundle.js')
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
    gulp.src('./dist/res/styles/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/res/styles'))
});

gulp.task('watch',function () {
    gulp.watch([
        './app/**/*.*',
        '!./app/res/styles/css/**/*.*',
        '!./app/libs/**/*.*'
    ], ['browserify'])
});

gulp.task('default', ['watch', 'browserify'], function () {
    // connect.server({
    //     port:33335,
    //     livereload: true,
    //     root:'dist'
    // });
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: 'dist/index.html#/main',
            port: '8089',
            proxies: [
                {
                    source: '/abc',
                    target: 'http://www.baidu.com',
                    options: { headers: { 'ABC_HEADER': 'abc' } }
                }
            ]
        }))
});