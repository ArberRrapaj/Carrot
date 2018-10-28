var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('backend-dependencies', () => {
    return run('cd Backend && npm install').exec()
})

gulp.task('backend-lint', () => {
    return run('cd Backend && npm run lint').exec()
})

gulp.task('frontend-lint', () => {
    return run('cd Frontend && npm run lint').exec()
})

gulp.task('frontend-dependencies', () => {
    return run('cd Frontend && npm install').exec()
})

gulp.task('parallelstart', () => {
    return run('npm start').exec()
})

gulp.task('default', [ 'backend-dependencies', 'frontend-dependencies', 'backend-lint', 'frontend-lint', 'parallelstart' ]);