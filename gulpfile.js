var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('backend-dependencies', () => {
    return run('cd Backend && npm install').exec()
})

gulp.task('backend-lint', ['backend-dependencies'], () => {
    return run('cd Backend && npm run lint').exec()
})

gulp.task('frontend-lint', ['frontend-dependencies'], () => {
    return run('cd Frontend && npm run lint').exec()
})

gulp.task('frontend-dependencies', () => {
    return run('cd Frontend && npm install').exec()
})

gulp.task('parallelstart', ['backend-lint', 'frontend-lint'], () => {
    return run('npm start').exec()
})

gulp.task('e2e', () => {
    return run('cd Frontend && ng e2e').exec()
})

gulp.task('unit', () => {
    return run('cd Backend && npm run test').exec()
})

gulp.task('default', ['backend-lint', 'frontend-lint']);