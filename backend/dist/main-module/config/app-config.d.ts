import { AppProperties } from './app-properties.model';
export declare class AppConfig {
    private _appConfig;
    setAppConfig(configName: string): void;
    readonly appConfig: AppProperties;
}
export declare const appConfig: AppConfig;
