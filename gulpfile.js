const { src, dest, watch, parallel, series } = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

function styles() {
	return src('src/scss/style.scss')
		.pipe(scss({outputStyle: 'expanded'}))
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: [
				'last 10 versions',
				'> 1%',
				'not IE 11',
				'not dead'
			],
			grid: true
		}))
		.pipe(dest('src/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src(['src/js/scripts.js'])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(dest('src/js'))
	.pipe(browserSync.stream())
}

function images() {
	return src('src/img/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(dest('build/img'))
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'src/'
		}
	})
}

function clean() {
	return del('build')
}

function build () {
	return src([
		'src/css/style.css',
		'src/fonts/**/*',
		'src/video/**/*',
		'src/js/*.js',
		'src/phpmailer/**/*',
		'src/*.php',
		'src/*.html'
	], {base: 'src'})
	.pipe(dest('build'))
}

function watching() {
	watch(['src/scss/**/*.scss'], styles);
	watch(['src/js/**/*.js', '!src/js/scripts.min.js'], scripts);
	watch(['src/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.clean = clean;

exports.build = series(clean, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);