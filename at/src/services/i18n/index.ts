// load all languages support
const ctx = require.context('./', false, /\.json$/);
const db: { [all: string]: object } = {};
ctx.keys().map(key => {
    db[key.slice(
        key.indexOf('./') + 2,
        key.indexOf('.json')
    )] = ctx(key)
});

class I18N {
    db: any = {};
    constructor(lang = navigator.language) {this.db = db[lang || 'zh-CN']}

    setLang = (lang: string) => lang && (this.db = db[lang]);
    get = (key: string) => {if (this.db) return this.db[key];};
}

export default new I18N;
