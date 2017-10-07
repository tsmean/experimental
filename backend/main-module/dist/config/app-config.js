"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
    // configName is the name of the properties file.
    // There's an untracked folder properties at the same level as the src directory with the properties.
    setAppConfig(configName) {
        this._appConfig = require(`../../properties/${configName}.properties.json`);
    }
    get appConfig() {
        return this._appConfig;
    }
}
exports.appConfig = new AppConfig();
