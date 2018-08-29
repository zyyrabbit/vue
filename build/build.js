const webpack = require("webpack");
const config = require("../config/config");
const gulp = require("gulp");
const gutil = require("gulp-util");
const webpackProdConfig = require("./webpack.prod.config");
const del = require("del");
gulp.task('clean-dist', () => {
    del([config.OUTPUT_PATH]).then(function (paths) {
        gutil.log("[clean]", paths);
    })
});

// 
gulp.task('build',['clean-dist'],() => {
	
	  webpack(webpackProdConfig, (err, stats) => {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
        }));
    });
})
 
