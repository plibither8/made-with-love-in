const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const DATA = require('./data.json');

gulp.task('pug', () => {
	const nameToCodeMap = {};
	Object.keys(DATA).forEach(key => {
		nameToCodeMap[DATA[key]] = key;
	});
	return gulp.src('src/pug/index.pug')
		.pipe(pug({
			locals: {
				countryNames: nameToCodeMap
			}
		}))
		.pipe(gulp.dest('public/'));
});

gulp.task('css', () => {
	return gulp.src('src/styl/index.styl')
		.pipe(stylus())
		.pipe(postcss([autoprefixer, cssnano]))
		.pipe(gulp.dest('public/'));
});

gulp.task('js', () => {
	return gulp.src('src/js/*.js')
		.pipe(concat('index.js'))
		.pipe(babel({
			comments: false,
			presets: ['env'],
			minified: true
		}))
		.pipe(gulp.dest('public/'));
});

gulp.task('default', ['css', 'js', 'pug'], () => {
	gulp.watch('src/**/*', ['css', 'js', 'pug']);
});
