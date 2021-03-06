
var gulp = require('gulp');
var browser_sync = require('browser-sync');
var gulp_filter = require('gulp-filter');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var plumber = require('gulp-plumber');
var del = require('del');

var dest_path_js = './public/js/';
var dest_path_css = './public/css/';

gulp.task('bower-files', function(){
    var js_filter = gulp_filter('**/*.js');
    var css_filter = gulp_filter('**/*.css');
    var font_filter = gulp_filter(['**/*.ttf', '**/*.woff', '**/*.woff2']);
    gulp.src(bower_files())
        .pipe(js_filter)
        .pipe(gulp.dest(dest_path_js + 'lib/'))
        .pipe(js_filter.restore())
        .pipe(css_filter)
        .pipe(gulp.dest(dest_path_css + 'lib/'))
        .pipe(css_filter.restore())
        .pipe(font_filter)
        .pipe(gulp.dest(dest_path_css + 'fonts/'))
});

gulp.task('css', function(){
    gulp.src('./assets/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(dest_path_css));
});

gulp.task('js', function(){
   gulp.src('./assets/coffee/*.coffee')
       .pipe(plumber())
       .pipe(coffee())
       .pipe(gulp.dest(dest_path_js));
});

gulp.task('browser-sync', function(){
    browser_sync.init(null, {
        proxy: 'localhost:8000'
    });
});

gulp.task('browser-sync-reload', function(){
    browser_sync.reload();
});

gulp.task('clean', function(){
    del([
        dest_path_js + 'lib/*.js',
        dest_path_js + '*.js',
        dest_path_css + 'lib/*.css',
        dest_path_css + '*.css'
    ]);
});

gulp.task('build', [ 'browser-sync', 'js', 'css' ]);

gulp.task('default', [ 'clean', 'build' ], function() {
    gulp.watch('assets/coffee/*.coffee', ['js', 'browser-sync-reload']);
    gulp.watch('assets/sass/*.scss', ['css', 'browser-sync-reload']);
    gulp.watch('app.rb', ['browser-sync-reload']);
    gulp.watch('views/*.slim', ['browser-sync-reload']);
});
