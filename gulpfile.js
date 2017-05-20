var gulp=require("gulp"),
    uglify=require("gulp-uglify"),
    concat=require("gulp-concat");
gulp.task("minifyjs",function () {
    gulp.src("js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(concat('order_query.js'))
        .pipe(gulp.dest('dist/js'))
})


gulp.task('default', ['minifyjs'])