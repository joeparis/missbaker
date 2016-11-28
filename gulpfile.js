var gulp = require('gulp');
var sass = require('gulp-sass');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');

gulp.task('default', function() {
  console.log("This is gulp!");
});

// gulp.task('sass', function() {
//     return gulp.src(['scss\\**\\*.scss', '!scss\\utility.scss'])
//         .pipe(sass())
//         .pipe(gulp.dest('dist\\styles'));
// });

gulp.task('sass', function() {
    // var f = filter(['scss\\**\\*.scss', '!**\\utility.scss']);
    var f = filter(['scss\\**\\*.scss', '!**\\*utility.*']);

    console.log("in task 'sass'");

    return gulp.src('scss\\**\\*.scss')
        .pipe(f)
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('dist\\styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// gulp.task('watch', ['minify', 'sass', 'browser-sync'], () => {
//     gulp.watch(['*.html', 'scss\\**\\*.scss'], ['minify', 'sass']);
// });

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch('*.html', ['minify-html']);
    gulp.watch('scss\\**\\*.scss', ['sass']);
    // gulp.watch(['dist\\*.html', 'dist\\styles\\*.css'], ['browser-sync']);
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('minify-html', () => {
    return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// gulp.task('minify-css', () => {
//     return gulp.src('dist\\styles\\*.css')
//     .pipe(uglifycss())
//     .pipe(gulp.dest('dist\\styles'))
// });
