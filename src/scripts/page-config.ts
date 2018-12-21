interface PageConfigType {
        ipsum: string
  }

export class PageConfig {
    constructor (private _defaultConfig?: PageConfigType) {}

    get defaultConfig () {
        return this._defaultConfig;
    }

    set defaultConfig (config) {
        if (!config) {
            throw new Error('No config provided')
        }
        this._defaultConfig = config;
    }
}