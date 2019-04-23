"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var resolve_1 = require("resolve");
var messages_1 = require("../util/messages");
function getJestConfigPkg(logger) {
    try {
        var jestPath = resolvePackagePath('jest', __dirname);
        var jestCliPath = resolvePackagePath('jest-cli', jestPath);
        var jestConfigPath = resolvePackagePath('jest-config', jestCliPath);
        var jestConfigPackageJson = require(path_1.join(jestConfigPath, 'package.json'));
        var jestConfigMainPath = path_1.resolve(jestConfigPath, jestConfigPackageJson.main);
        return require(jestConfigMainPath);
    }
    catch (error) {
        logger.error({ error: error }, messages_1.Errors.UnableToResolveJestConfig);
        return {};
    }
}
exports.getJestConfigPkg = getJestConfigPkg;
function resolvePackagePath(packageName, baseDir) {
    var packageJsonPath = resolve_1.sync(packageName, {
        basedir: baseDir,
        packageFilter: function (packageJson) {
            packageJson.main = 'package.json';
            return packageJson;
        },
        readFileSync: fs_1.readFileSync,
        isFile: isFile,
    });
    var realPackageJsonPath = fs_1.realpathSync(packageJsonPath);
    return path_1.dirname(realPackageJsonPath);
}
function isFile(filePath) {
    if (fs_1.existsSync(filePath)) {
        var stats = fs_1.statSync(filePath);
        return stats.isFile();
    }
    else {
        return false;
    }
}
