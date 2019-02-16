const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const inlineSource = require('gulp-inline-source');
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

gulp.task('generateCss', () => {
	return gulp.src('src/styl/index.styl')
		.pipe(stylus())
		.pipe(postcss([autoprefixer, cssnano]))
		.pipe(gulp.dest('public/'));
});

gulp.task('inlineCss', () => {
	return gulp.src('public/index.html')
		.pipe(inlineSource())
		.pipe(gulp.dest('public/'));
});

gulp.task('deleteCss', () => {
	return del('public/index.css');
})

gulp.task('html', gulp.series(
		'pug',
		'generateCss',
		'inlineCss',
		'deleteCss'
	)
);

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

gulp.task('watch', () => {
	gulp.watch('src/**/*', gulp.parallel('js', 'html'));
});

gulp.task('build', gulp.parallel('js', 'html'));

gulp.task('default', gulp.series('build', 'watch'));
