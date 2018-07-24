var changes = 'FRAMEWORK_SEARCH_PATHS = "../../libs/ios"';

module.exports = function (ctx) {

    var fs = ctx.requireCordovaModule('fs');
    var path = ctx.requireCordovaModule('path');
    var os = ctx.requireCordovaModule('os');

    var buildConfig = path.join(ctx.opts.projectRoot, 'platforms/ios/cordova/build.xcconfig');

    if (fs.existsSync(buildConfig)) {
        fs.readFile(buildConfig, 'utf8', function (error, data) {
            if (error) {
                throw new Error('Unable to find build.xcconfig: ' + error);
            }

            if (data.indexOf(changes) == -1) {
                var result = data + os.EOL + changes;

                fs.writeFile(buildConfig, result, 'utf8', function (error) {
                    if (error) {
                        throw new Error('Unable to write into build.xcconfig file: ' + error);
                    }
                });
            }
        });
    }
};
