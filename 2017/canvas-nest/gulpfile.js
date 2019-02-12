var gulp = require('gulp')
var browserSync = require('browser-sync').create() // 自动刷新
var reload = browserSync.reload
var babel = require('gulp-babel')

gulp.task('default', function () {
  return  gulp.src('js/**/*.js')
          .pipe(babel({
            presets: ['env']
          }))
          .pipe(gulp.dest('dist'))
})

gulp.task('dev', function () {
  browserSync.init({
    server: {
      baseDir: '/'
    },
    open: 'external'
  })

  gulp.watch('**/*.html').on('change', reload)
  gulp.watch('js/**/*.js').on('change', reload)
})