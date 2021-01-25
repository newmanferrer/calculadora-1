/* ======================================== */
/* Version 1.0 | Newman Ferrer | 12/01/2020 */
/* ======================================== */

/* IMPORT (Modulos o Dependencias a utilizar)
=============================================================== */
import gulp from 'gulp'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import plumber from 'gulp-plumber'

import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import zIndex from 'postcss-zindex'
import pseudoelements from 'postcss-pseudoelements'
import nthChild from 'postcss-nth-child-fix'

import browserSync from 'browser-sync'
const browserDev = browserSync.create()
/* ============================================================ */

/* Tarea SASS (postCSS)
   1.- Configuracion de opciones para cuando nos encontramos en
   Producción o en Desarrollo. 
   2.- Configuación de los Plugins a utilizar. 
   3.- Tarea sass a aplicar en Desarrollo (stylesDev). 
   4.- Tarea sass a aplicar en Producción (stylesPro).   
================================================================ */
const production = true

const sassOptionDev = {
    includePaths: ['node_modules'],
    sourceComments: true,
    outputStyle: 'expanded'
}

const sassOptionPro = {
    includePaths: ['node_modules'],
    sourceComments: false,
    outputStyle: 'compressed'
}

const postCssPlugins = [
    autoprefixer(),
    zIndex(),
    pseudoelements(),
    nthChild()
]

gulp.task('stylesDev',()=>{
    return gulp
        .src('./dev/scss/styles.scss')
        .pipe(plumber())
        .pipe(sass(sassOptionDev))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserDev.stream())
})

gulp.task('stylesPro',()=>{
    return gulp
        .src('./dev/scss/styles.scss')
        .pipe(plumber())
        .pipe(sass(sassOptionPro))
        .pipe(postcss(postCssPlugins))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserDev.stream())
})
/* ============================================================= */

/* Tarea PUG (Compilar o Transpilar Html)
================================================================ */
gulp.task('pug',()=>{
    return gulp
        .src('./dev/views/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
})
/* ============================================================== */

/* Tarea babel (Compilar o Transpilar JavaScript)
   (une las tareas Babel, Concat y Uglify)                           
   Tarea Concat (permite unir varios archivos JavaScript en un solo archivo)     
   Tarea Uglify (permite minificar y comprimir nuestro codigo JavaScript)        
================================================================================= */
gulp.task('babel',()=>{
    return gulp
        .src('./dev/js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('scripts-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
})
/* ================================================================================ */

/* Tarea por defecto (BrowserSync y vigilantes)
============================================================================================= */
gulp.task('default',()=>{
    browserDev.init({
        server: './public'
    })

    production
    ? gulp.watch('./dev/scss/**/*.scss',gulp.series('stylesPro'))
    : gulp.watch('./dev/scss/**/*.scss',gulp.series('stylesDev'))

    gulp.watch('./dev/views/**/*.pug',gulp.series('pug')).on('change',browserDev.reload)
    gulp.watch('./dev/js/*.js',gulp.series('babel')).on('change',browserDev.reload)
})
/* ========================================================================================== */